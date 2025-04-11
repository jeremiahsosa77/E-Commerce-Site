import mongoose from 'mongoose';

export interface IOrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  variation: {
    size?: string;
    color?: string;
    material: string;
  };
  product: mongoose.Types.ObjectId;
}

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IOrder extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  discountPrice: number;
  discountCode?: string;
  isPaid: boolean;
  paidAt?: Date;
  isShipped: boolean;
  shippedAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  pointsEarned: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered', 'cancelled'],
    default: 'processing',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Calculate points earned before saving (100 points per $1 spent)
orderSchema.pre('save', function (next) {
  if (this.isModified('totalPrice') || this.isNew) {
    this.pointsEarned = Math.floor(this.totalPrice * 100);
  }
  next();
});

// Update status based on other fields
orderSchema.pre('save', function (next) {
  if (this.isDelivered) {
    this.status = 'delivered';
  } else if (this.isShipped) {
    this.status = 'shipped';
  } else if (this.isPaid) {
    this.status = 'processing';
  } else {
    this.status = 'pending';
  }
  next();
});

// Delete the model if it's already registered to prevent OverwriteModelError
mongoose.models = {};

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order; 