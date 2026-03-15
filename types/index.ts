export interface Product {
  id: number;
  slug: string;
  title: string;
  price: number;
  salePrice: number | null;
  category: string;
  subcategory: string;
  description: string;
  shortDescription: string;
  sizes: string[];
  colors: { name: string; value: string }[];
  image: string;
  placeholderColor: string;
  hoverPlaceholderColor: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  isSale: boolean;
  stockCount: number;
  details: {
    material: string;
    care: string;
    fit: string;
  };
  shippingInfo: string;
  frequentlyBoughtWith: string[];
  video?: string;
  layout?: 'default' | 'wide';
}

export interface CartItem {
  id: number;
  slug: string;
  title: string;
  price: number;
  salePrice: number | null;
  size: string;
  color: string;
  quantity: number;
  image: string;
  placeholderColor: string;
}

export interface WishlistItem {
  id: number;
  slug: string;
  title: string;
  price: number;
  salePrice: number | null;
  image: string;
  placeholderColor: string;
}

export interface CompareItem {
  id: number;
  slug: string;
  title: string;
  price: number;
  salePrice: number | null;
  image: string;
  placeholderColor: string;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  description: string;
  productCount: number;
  image: string;
  placeholderColor: string;
}

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  quote: string;
  productPurchased: string;
  initials: string;
  image: string;
}

export interface Review {
  productId: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  image: string;
  social: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  badge?: boolean;
  megaMenuType?: string;
  subcategories?: { label: string; href: string }[];
  megaMenuColumns?: {
    title: string;
    links: { label: string; href: string }[];
  }[];
  trendingProducts?: {
    title: string;
    price: string;
    href: string;
    image: string;
  }[];
  featured?: {
    title: string;
    description: string;
    href: string;
    image: string;
  } | null;
  promoBanner?: {
    text: string;
    href: string;
    bgColor: string;
  };
}

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  author: string;
  email: string;
  phone: string;
  address: string;
  social: Record<string, string>;
  logo: {
    type: string;
    text: string;
    image: string;
    imageDark: string;
    width: number;
    height: number;
  };
  currency: string;
  currencySymbol: string;
  defaultTheme: string;
  announcementBar: {
    text: string;
    link: string;
    enabled: boolean;
  };
  freeShippingThreshold: number;
  footer: {
    copyright: string;
    tagline: string;
  };
}

export interface FilterState {
  categories: string[];
  priceMin: number | null;
  priceMax: number | null;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  sort: string;
}

export type Locale = 'en' | 'ar' | 'fr';

export interface LookbookItem {
  id: number;
  slug: string;
  title: string;
  season: string;
  year: number;
  description: string;
  itemCount: number;
  image: string;
  placeholderColor: string;
  tag: string;
}

export interface StoreLocation {
  id: number;
  city: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  placeholderColor: string;
  coordinates: { lat: number; lng: number };
}

export interface Career {
  perks: { title: string; description: string; icon: string }[];
  positions: {
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    posted: string;
  }[];
}

export interface FeatureGroup {
  id: string;
  title: string;
  icon: string;
  color: string;
  features: {
    name: string;
    description: string;
    link?: string;
    linkType?: string;
    hint?: string;
  }[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
