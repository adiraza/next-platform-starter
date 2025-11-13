// Data structure and helper functions for content management

export interface HomeContent {
  hero: {
    badge: string;
    title: string;
    description: string;
    ctaPrimary: { text: string; link: string };
    ctaSecondary: { text: string; link: string };
  };
  stats: Array<{ icon: string; value: string; label: string }>;
  features: Array<{ icon: string; title: string; desc: string }>;
}

export interface AboutContent {
  mission: string;
  vision: string;
  goal: string;
  milestones: string[];
  contactInfo: {
    address: string;
    phone: string;
    email: string;
  };
  locations: Array<{
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  }>;
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  image?: string;
  features: string[];
  benefits: string[];
  stats: Array<{ label: string; value: string }>;
  process: Array<{ step: number; title: string; description: string }>;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  type: "Commercial" | "Residential" | "Industrial";
  location: string;
  capacity: string;
  status: "working" | "completed";
  description: string;
  features: string[];
  startDate: string;
  completionDate?: string;
  image: string;
  achievements?: string[];
  progress?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  level: "ceo" | "director" | "manager" | "employee";
  photo: string;
  email: string;
  phone?: string;
  linkedin?: string;
  bio: string;
  experience: string;
  achievements?: string[];
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "message" | "consultation";
}

export interface Quote {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  requirements: string;
  timestamp: string;
  pdfPath: string;
}

export interface Client {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  feedback?: string;
  rating?: number;
  projectId?: string;
  timestamp: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image?: string;
  author: string;
  publishedAt: string;
  published: boolean;
  tags: string[];
}

export interface Analytics {
  totalVisitors: number;
  dailyVisitors: Array<{ date: string; count: number }>;
  weeklyVisitors: Array<{ week: string; count: number }>;
  monthlyVisitors: Array<{ month: string; count: number }>;
  pageViews: Array<{ page: string; views: number }>;
  lastUpdated: string;
}

export interface Stat {
  id: string;
  icon: string;
  value: string;
  suffix?: string;
  label: string;
  order: number;
}

export interface WhyChooseUs {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  order: number;
}

export interface Solution {
  id: string;
  title: string;
  desc: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  designation?: string;
  photo?: string;
  rating: number;
  testimonial: string;
  project?: string;
  timestamp: string;
  featured: boolean;
}

export interface SocialMedia {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  whatsapp?: string;
}

export interface SEOSettings {
  siteTitle: string;
  siteDescription: string;
  keywords: string[];
  ogImage?: string;
  twitterHandle?: string;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
}

export interface SiteSettings {
  siteName: string;
  logo?: string;
  favicon?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  workingHours: string;
  footerText: string;
  socialMedia: SocialMedia;
  seo: SEOSettings;
}
