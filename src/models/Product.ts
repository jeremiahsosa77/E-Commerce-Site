import mongoose from 'mongoose';

export interface IReview {
  user: mongoose.Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface IProductVariation {
  size?: string;
  color?: string;
  material: string;
  price: number;
  stock: number;
  sku: string;
}

export interface IProduct extends mongoose.Document {
  name: string;
  slug: string;
  description: string;
  details: string;
  images: string[];
  category: string;
  subcategory?: string;
  featured: boolean;
  variations: IProductVariation[];
  reviews: IReview[];
  rating: number;
  numReviews: number;
  printTime: number; // In hours
  filamentUsage: number; // In grams
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const variationSchema = new mongoose.Schema({
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  material: {
    type: String,
    required: true,
    enum: ['PLA', 'ABS', 'PETG', 'TPU', 'Nylon', 'Resin'],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
  },
  images: [{
    type: String,
    required: [true, 'Please provide at least one product image'],
  }],
  category: {
    type: String,
    required: [true, 'Please provide a product category'],
  },
  stock: {
    type: Number,
    required: [true, 'Please provide product stock'],
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  specifications: {
    type: Map,
    of: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-generate slug from name
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Update rating
productSchema.pre('save', function (next) {
  if (this.reviews.length > 0) {
    this.rating =
      this.reviews.reduce((acc, review) => acc + review.rating, 0) /
      this.reviews.length;
    this.numReviews = this.reviews.length;
  }
  next();
});

// Delete the model if it's already registered to prevent OverwriteModelError
mongoose.models = {};

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product; 