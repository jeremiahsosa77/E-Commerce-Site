import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  image?: string;
  role: 'user' | 'admin';
  points: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  referralCode: string;
  referredBy?: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
  getTierDiscount: () => number;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    points: {
      type: Number,
      default: 0,
    },
    tier: {
      type: String,
      enum: ['bronze', 'silver', 'gold', 'platinum'],
      default: 'bronze',
    },
    referralCode: {
      type: String,
      unique: true,
    },
    referredBy: {
      type: String,
    },
    language: {
      type: String,
      enum: ['en', 'es'],
      default: 'en',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Generate referral code before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') && this.referralCode) {
    // Update tier based on points
    this.tier = this.points <= 5000 
      ? 'bronze' 
      : this.points <= 15000 
      ? 'silver' 
      : this.points <= 30000 
      ? 'gold' 
      : 'platinum';
    return next();
  }

  // Hash password
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // Generate referral code if it doesn't exist
  if (!this.referralCode) {
    this.referralCode = this._id.toString().slice(-6).toUpperCase() +
      Math.random().toString(36).substring(2, 5).toUpperCase();
  }

  // Update tier based on points
  this.tier = this.points <= 5000 
    ? 'bronze' 
    : this.points <= 15000 
    ? 'silver' 
    : this.points <= 30000 
    ? 'gold' 
    : 'platinum';

  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get the discount percentage based on tier
userSchema.methods.getTierDiscount = function () {
  const discounts = {
    bronze: 5, // 5% off
    silver: 10, // 10% off
    gold: 15, // 15% off
    platinum: 20, // 20% off
  };
  return discounts[this.tier] || 0;
};

// Delete the model if it's already registered to prevent OverwriteModelError
mongoose.models = {};

const User = mongoose.model<IUser>('User', userSchema);

export default User; 