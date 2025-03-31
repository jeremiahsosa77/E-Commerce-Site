import mongoose from 'mongoose';

export interface ICustomOrder extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  name: string;
  description: string;
  reference: string[]; // Image URLs
  requirements: string;
  size: 'small' | 'medium' | 'large' | 'custom';
  customSize?: {
    width: number;
    height: number;
    depth: number;
  };
  material: string;
  color: string;
  quantity: number;
  status: 'pending' | 'approved' | 'rejected' | 'in_progress' | 'completed' | 'cancelled';
  priority: boolean;
  price?: number;
  adminNotes?: string;
  estimatedCompletionTime?: Date;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const customOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please provide a name for this custom order'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description of what you want made'],
    },
    reference: [
      {
        type: String, // URLs to reference images
      },
    ],
    requirements: {
      type: String,
      required: [true, 'Please provide any specific requirements'],
    },
    size: {
      type: String,
      required: [true, 'Please select a size'],
      enum: ['small', 'medium', 'large', 'custom'],
    },
    customSize: {
      width: {
        type: Number,
        min: 0,
      },
      height: {
        type: Number,
        min: 0,
      },
      depth: {
        type: Number,
        min: 0,
      },
    },
    material: {
      type: String,
      required: [true, 'Please select a material'],
      enum: ['PLA', 'ABS', 'PETG', 'TPU', 'Nylon', 'Resin'],
    },
    color: {
      type: String,
      required: [true, 'Please specify a color'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please specify quantity'],
      min: [1, 'Quantity must be at least 1'],
      default: 1,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'approved', 'rejected', 'in_progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    priority: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      min: 0,
    },
    adminNotes: {
      type: String,
    },
    estimatedCompletionTime: {
      type: Date,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
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
  },
  { timestamps: true }
);

// Validate custom size if size is 'custom'
customOrderSchema.pre('validate', function (next) {
  if (this.size === 'custom') {
    if (!this.customSize) {
      this.invalidate('customSize', 'Custom size details are required when selecting custom size');
    } else if (!this.customSize.width || !this.customSize.height || !this.customSize.depth) {
      this.invalidate('customSize', 'All dimensions (width, height, depth) are required for custom size');
    }
  }
  next();
});

// Set priority based on user's tier
customOrderSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const user = await mongoose.model('User').findById(this.user);
      if (user && user.tier === 'platinum') {
        this.priority = true;
      }
    } catch (error) {
      console.error('Error checking user tier:', error);
    }
  }
  next();
});

// Delete the model if it's already registered to prevent OverwriteModelError
mongoose.models = {};

const CustomOrder = mongoose.model<ICustomOrder>('CustomOrder', customOrderSchema);

export default CustomOrder; 