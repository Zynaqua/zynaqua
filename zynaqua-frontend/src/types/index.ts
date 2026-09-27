// src/types/index.ts
// Central type definitions, extended day by day as entities are built.
// WHY: keeping types in one place prevents drift between components that
// consume the same API shape (e.g. ProductCard vs ProductDetail).

export interface Product {
  id: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  price: number;
  mrp: number | null;
  category: string | null;
  isFeatured: boolean;
  isActive: boolean;
  images: ProductImage[];
  features: ProductFeature[];
  specifications: ProductSpecification[];
}

export interface ProductImage {
  id: number;
  imageUrl: string;
  altText: string | null;
  displayOrder: number;
  isPrimary: boolean;
}

export interface ProductFeature {
  id: number;
  featureName: string;
  featureValue: string | null;
  displayOrder: number;
}

export interface ProductSpecification {
  id: number;
  specificationName: string;
  specificationValue: string;
  displayOrder: number;
}

export type EnquiryType =
  | 'FREE_DEMO'
  | 'PRODUCT_ENQUIRY'
  | 'AMC'
  | 'SERVICE'
  | 'GENERAL';

export type EnquiryStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'FOLLOW_UP'
  | 'DEMO_SCHEDULED'
  | 'DEMO_COMPLETED'
  | 'CONVERTED'
  | 'NOT_INTERESTED'
  | 'CANCELLED';

export interface LeadRequest {
  name: string;
  mobile: string;
  email?: string;
  city: string;
  pincode: string;
  address: string;
  enquiryType: EnquiryType;
  productId?: number;
}

export interface Customer {
  id: number;
  name: string;
  mobile: string;
  email: string | null;
  city: string;
  pincode: string;
  address: string;
  createdAt: string;
}

export type EnquirySource = "ONLINE" | "OFFLINE";