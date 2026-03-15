export interface WhatsAppLink {
  phone: string;
  message?: string;
  url: string;
}

export interface QRCodeOptions {
  url: string;
  size: number;
  color: string;
  bgColor: string;
  style: 'dots' | 'rounded' | 'squares' | 'extra-rounded';
}

export interface MessageTemplate {
  title: string;
  template: string;
  category: 'business' | 'customer' | 'marketing' | 'personal';
}

export interface ShortenedLink {
  original: string;
  short: string;
  clicks: number;
  created: string;
}

export interface ProductMessage {
  productName: string;
  price: string;
  description: string;
  image?: string;
  link?: string;
}
