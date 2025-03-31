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

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variation: {
          size: { type: String },
          color: { type: String },
          material: { type: String, required: true },
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    discountPrice: {
      type: Number,
      default: 0.0,
    },
    discountCode: {
      type: String,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isShipped: {
      type: Boolean,
      required: true,
      default: false,
    },
    shippedAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    pointsEarned: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

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