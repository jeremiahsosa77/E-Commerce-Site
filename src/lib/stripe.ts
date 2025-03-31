import Stripe from 'stripe';
import User from '@/models/User';
import Order from '@/models/Order';
import CustomOrder from '@/models/CustomOrder';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export const createCheckoutSession = async ({
  items,
  userId,
  discountCode,
}: {
  items: any[];
  userId: string;
  discountCode?: string;
}) => {
  // Get user to apply loyalty tier discount
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Calculate tier discount percentage
  const tierDiscount = user.getTierDiscount();

  // Apply discount code if provided
  let discountAmount = 0;
  let couponId = null;

  if (discountCode) {
    // Get discount from the database
    const mongoose = await import('mongoose');
    const Discount = mongoose.model('Discount');
    const discount = await Discount.findOne({ code: discountCode, isActive: true });
    
    if (discount && discount.canBeUsed()) {
      // Calculate discount amount
      const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
      discountAmount = discount.calculateDiscount(subtotal);
      
      // Create a Stripe coupon if needed
      if (discountAmount > 0) {
        const coupon = await stripe.coupons.create({
          amount_off: Math.round(discountAmount * 100), // Convert to cents
          currency: 'usd',
          duration: 'once',
          name: `Discount Code: ${discountCode}`,
        });
        
        couponId = coupon.id;
        
        // Mark discount as used
        await discount.use();
        await discount.save();
      }
    }
  }

  // Create Stripe session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'MX'],
    },
    line_items: items.map((item) => {
      // Apply tier discount to each item
      const discountedPrice = item.price * (1 - tierDiscount / 100);
      
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
            description: item.description,
            metadata: {
              productId: item.productId,
              variation: JSON.stringify(item.variation),
            },
          },
          unit_amount: Math.round(discountedPrice * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    }),
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    metadata: {
      userId,
      tierDiscount: String(tierDiscount),
      discountCode: discountCode || '',
      orderType: 'regular',
    },
    discounts: couponId ? [{ coupon: couponId }] : [],
  });

  return session;
};

export const createCustomOrderCheckoutSession = async ({
  customOrderId,
  userId,
  price,
}: {
  customOrderId: string;
  userId: string;
  price: number;
}) => {
  // Get user to apply loyalty tier discount
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Get custom order details
  const customOrder = await CustomOrder.findById(customOrderId);
  if (!customOrder) {
    throw new Error('Custom order not found');
  }

  // Calculate tier discount percentage
  const tierDiscount = user.getTierDiscount();
  const discountedPrice = price * (1 - tierDiscount / 100);

  // Create Stripe session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'MX'],
    },
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Custom Order: ${customOrder.name}`,
            description: customOrder.description.substring(0, 100) + '...',
            metadata: {
              customOrderId,
            },
          },
          unit_amount: Math.round(discountedPrice * 100), // Convert to cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/custom-orders/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/custom-orders/${customOrderId}`,
    metadata: {
      userId,
      customOrderId,
      tierDiscount: String(tierDiscount),
      orderType: 'custom',
    },
  });

  return session;
};

export const handleWebhook = async (event: any) => {
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      // Get metadata from session
      const { userId, tierDiscount, discountCode, orderType, customOrderId } = session.metadata;
      
      if (orderType === 'regular') {
        // Process regular order
        await processRegularOrder(session, userId, Number(tierDiscount), discountCode);
      } else if (orderType === 'custom') {
        // Process custom order
        await processCustomOrder(session, userId, customOrderId);
      }
      
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
};

const processRegularOrder = async (session: any, userId: string, tierDiscount: number, discountCode: string) => {
  // Get line items from the session
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
  
  // Get expanded product data
  const expandedItems = await Promise.all(
    lineItems.data.map(async (item) => {
      const product = await stripe.products.retrieve(item.price?.product as string);
      return {
        ...item,
        product,
      };
    })
  );
  
  // Create order items
  const orderItems = expandedItems.map((item) => {
    const metadata = item.product.metadata;
    const variation = JSON.parse(metadata.variation || '{}');
    
    return {
      name: item.description,
      quantity: item.quantity,
      image: item.product.images?.[0] || '',
      price: item.price?.unit_amount ? item.price.unit_amount / 100 : 0, // Convert from cents
      variation,
      product: metadata.productId,
    };
  });
  
  // Calculate order totals
  const itemsPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxPrice = session.total_details?.amount_tax ? session.total_details.amount_tax / 100 : 0;
  const shippingPrice = session.shipping_cost?.amount_total ? session.shipping_cost.amount_total / 100 : 0;
  const totalPrice = session.amount_total / 100; // Convert from cents
  
  // Calculate discount
  const discountPrice = itemsPrice + taxPrice + shippingPrice - totalPrice;
  
  // Create the order
  const order = new Order({
    user: userId,
    orderItems,
    shippingAddress: {
      address: session.shipping?.address?.line1,
      city: session.shipping?.address?.city,
      postalCode: session.shipping?.address?.postal_code,
      country: session.shipping?.address?.country,
    },
    paymentMethod: 'Stripe',
    paymentResult: {
      id: session.payment_intent,
      status: 'completed',
      update_time: new Date().toISOString(),
      email_address: session.customer_details?.email,
    },
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    discountPrice,
    discountCode,
    isPaid: true,
    paidAt: new Date(),
  });
  
  await order.save();
  
  // Update user points
  const pointsEarned = Math.floor(totalPrice * 100); // 100 points per $1
  await User.findByIdAndUpdate(userId, {
    $inc: { points: pointsEarned },
  });
};

const processCustomOrder = async (session: any, userId: string, customOrderId: string) => {
  // Update custom order payment status
  await CustomOrder.findByIdAndUpdate(customOrderId, {
    price: session.amount_total / 100, // Convert from cents
    status: 'approved',
    isPaid: true,
    paidAt: new Date(),
  });
  
  // Update user points
  const pointsEarned = Math.floor(session.amount_total / 100 * 100); // 100 points per $1
  await User.findByIdAndUpdate(userId, {
    $inc: { points: pointsEarned },
  });
};

export default stripe; 