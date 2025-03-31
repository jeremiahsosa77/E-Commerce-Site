import mongoose from 'mongoose';

export interface IDiscount extends mongoose.Document {
  code: string;
  type: 'percentage' | 'fixed' | 'referral';
  value: number; // Percentage or fixed amount
  maxUses: number;
  currentUses: number;
  minPurchase: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  referredBy?: mongoose.Types.ObjectId; // For referral discounts
  createdAt: Date;
  updatedAt: Date;
}

const discountSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Please provide a discount code'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    type: {
      type: String,
      required: [true, 'Please specify discount type'],
      enum: ['percentage', 'fixed', 'referral'],
    },
    value: {
      type: Number,
      required: [true, 'Please specify discount value'],
      min: 0,
    },
    maxUses: {
      type: Number,
      required: [true, 'Please specify maximum number of uses'],
      default: 1,
      min: 1,
    },
    currentUses: {
      type: Number,
      default: 0,
      min: 0,
    },
    minPurchase: {
      type: Number,
      default: 0,
      min: 0,
    },
    validFrom: {
      type: Date,
      required: [true, 'Please specify start date'],
      default: Date.now,
    },
    validUntil: {
      type: Date,
      required: [true, 'Please specify end date'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// Check if discount can be used
discountSchema.methods.canBeUsed = function() {
  const now = new Date();
  return (
    this.isActive &&
    this.currentUses < this.maxUses &&
    now >= this.validFrom &&
    now <= this.validUntil
  );
};

// Calculate discount amount
discountSchema.methods.calculateDiscount = function(subtotal: number) {
  if (subtotal < this.minPurchase) {
    return 0;
  }

  if (this.type === 'percentage') {
    return (subtotal * this.value) / 100;
  } else if (this.type === 'fixed' || this.type === 'referral') {
    return Math.min(this.value, subtotal); // Cannot exceed order value
  }

  return 0;
};

// Update usage count
discountSchema.methods.use = function() {
  if (this.currentUses < this.maxUses) {
    this.currentUses += 1;
    if (this.currentUses >= this.maxUses) {
      this.isActive = false;
    }
    return true;
  }
  return false;
};

// Delete the model if it's already registered to prevent OverwriteModelError
mongoose.models = {};

const Discount = mongoose.model<IDiscount>('Discount', discountSchema);

export default Discount; 