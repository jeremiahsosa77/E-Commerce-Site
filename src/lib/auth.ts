import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDatabase } from './db';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        await connectToDatabase();

        // Find user by email
        const user = await User.findOne({ email: credentials.email }).select('+password');
        
        if (!user) {
          throw new Error('No user found with this email');
        }

        // Verify password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          points: user.points,
          tier: user.tier,
          referralCode: user.referralCode,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.points = user.points;
        token.tier = user.tier;
        token.referralCode = user.referralCode;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.points = token.points as number;
        session.user.tier = token.tier as string;
        session.user.referralCode = token.referralCode as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Handle sign-in with OAuth providers
      if (account?.provider === 'google') {
        try {
          await connectToDatabase();
          
          // Check if user exists
          const existingUser = await User.findOne({ email: profile?.email });
          
          if (!existingUser) {
            // Create new user with OAuth data
            const newUser = new User({
              name: profile?.name,
              email: profile?.email,
              image: profile?.image,
              password: bcrypt.hashSync(Math.random().toString(36).slice(-8), 10),
            });
            
            await newUser.save();
            
            user.id = newUser._id.toString();
            user.role = newUser.role;
            user.points = newUser.points;
            user.tier = newUser.tier;
            user.referralCode = newUser.referralCode;
          } else {
            user.id = existingUser._id.toString();
            user.role = existingUser.role;
            user.points = existingUser.points;
            user.tier = existingUser.tier;
            user.referralCode = existingUser.referralCode;
          }
        } catch (error) {
          console.error('Error handling OAuth sign-in:', error);
          return false;
        }
      }
      
      return true;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

export default authOptions; 