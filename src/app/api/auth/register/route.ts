import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Define validation schema
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  referralCode: z.string().optional(),
  language: z.enum(['en', 'es']).default('en'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const { name, email, password, referralCode, language } = result.data;
    
    await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Check referral code if provided
    let referredBy;
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        referredBy = referrer.referralCode;
      }
    }
    
    // Create new user
    const newUser = new User({
      name,
      email,
      password, // Will be hashed in the pre-save hook
      referredBy,
      language,
    });
    
    await newUser.save();
    
    // If referred, create a referral discount for the new user
    if (referredBy) {
      const mongoose = await connectToDatabase();
      const Discount = mongoose.model('Discount');
      
      // Create a 20% discount for the new user (referral bonus)
      const newDiscount = new Discount({
        code: `REF-${newUser.referralCode}`,
        type: 'percentage',
        value: 20, // 20% off
        maxUses: 1,
        minPurchase: 0,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        isActive: true,
        referredBy: referredBy,
      });
      
      await newDiscount.save();
    }
    
    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          referralCode: newUser.referralCode,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Something went wrong during registration' },
      { status: 500 }
    );
  }
} 