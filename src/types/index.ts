export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageSrc: string;
  imageAlt: string;
  category: 'functional' | 'art' | 'other';
  featured?: boolean;
  inStock: boolean;
  newArrival?: boolean;
  details?: string;
  specs?: {
    dimensions?: string;
    weight?: string;
    material?: string;
    color?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variation?: {
    size?: string;
    color?: string;
    material?: string;
  };
}

export interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  createdAt: string;
  updatedAt: string;
}

export interface CustomOrder {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  description: string;
  material?: string;
  color?: string;
  size?: string;
  quantity: number;
  reference?: string;
  status: 'requested' | 'quoted' | 'approved' | 'rejected' | 'in_progress' | 'completed';
  quotedPrice?: number;
  createdAt: string;
  updatedAt: string;
}

// API response types
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: string;
  message?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Filter and Sort types
export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  inStock?: boolean;
  newArrival?: boolean;
  search?: string;
}

export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
} 