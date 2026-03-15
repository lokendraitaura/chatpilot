export const WHATSAPP_BASE_URL = 'https://wa.me/';

export const THEMES = [
  { id: 'emerald', name: 'Emerald Green', primary: '#10B981', secondary: '#059669' },
  { id: 'whatsapp', name: 'WhatsApp Classic', primary: '#25D366', secondary: '#128C7E' },
  { id: 'ocean', name: 'Ocean Blue', primary: '#0EA5E9', secondary: '#0284C7' },
  { id: 'purple', name: 'Purple Haze', primary: '#7C3AED', secondary: '#6D28D9' },
  { id: 'rose', name: 'Rose Pink', primary: '#F43F5E', secondary: '#E11D48' },
  { id: 'amber', name: 'Amber Gold', primary: '#F59E0B', secondary: '#D97706' },
  { id: 'teal', name: 'Teal Wave', primary: '#14B8A6', secondary: '#0D9488' },
  { id: 'indigo', name: 'Indigo Night', primary: '#6366F1', secondary: '#4F46E5' },
  { id: 'lime', name: 'Lime Fresh', primary: '#84CC16', secondary: '#65A30D' },
  { id: 'fuchsia', name: 'Fuchsia Dream', primary: '#D946EF', secondary: '#C026D3' },
  { id: 'cyan', name: 'Cyan Cool', primary: '#06B6D4', secondary: '#0891B2' },
  { id: 'orange', name: 'Orange Burst', primary: '#F97316', secondary: '#EA580C' },
  { id: 'violet', name: 'Violet Magic', primary: '#8B5CF6', secondary: '#7C3AED' },
  { id: 'pink', name: 'Pink Candy', primary: '#EC4899', secondary: '#DB2777' },
  { id: 'red', name: 'Red Passion', primary: '#EF4444', secondary: '#DC2626' },
  { id: 'blue', name: 'Sky Blue', primary: '#3B82F6', secondary: '#2563EB' },
  { id: 'green', name: 'Forest Green', primary: '#22C55E', secondary: '#16A34A' },
  { id: 'slate', name: 'Slate Gray', primary: '#64748B', secondary: '#475569' },
  { id: 'yellow', name: 'Sunshine Yellow', primary: '#EAB308', secondary: '#CA8A04' },
  { id: 'mint', name: 'Mint Fresh', primary: '#34D399', secondary: '#10B981' },
];

export const MESSAGE_TEMPLATES = {
  business: [
    {
      title: 'Meeting Request',
      template: 'Hi! I would like to schedule a meeting to discuss [topic]. Are you available on [date/time]?',
      category: 'business',
    },
    {
      title: 'Follow Up',
      template: 'Hello! Following up on our previous conversation about [topic]. Looking forward to your response.',
      category: 'business',
    },
    {
      title: 'Product Inquiry',
      template: 'Hi! I\'m interested in learning more about your [product/service]. Can you share more details?',
      category: 'business',
    },
  ],
  customer: [
    {
      title: 'Order Confirmation',
      template: 'Thank you for your order! Your order #[ORDER_ID] has been confirmed and will be delivered by [DATE].',
      category: 'customer',
    },
    {
      title: 'Support Response',
      template: 'Thank you for contacting us! We\'ve received your query and will get back to you within 24 hours.',
      category: 'customer',
    },
    {
      title: 'Appointment Reminder',
      template: 'This is a reminder for your appointment on [DATE] at [TIME]. Reply CONFIRM to confirm.',
      category: 'customer',
    },
  ],
  marketing: [
    {
      title: 'Special Offer',
      template: '🎉 Special Offer Alert! Get [DISCOUNT]% off on [PRODUCT]. Limited time only! Shop now: [LINK]',
      category: 'marketing',
    },
    {
      title: 'New Product Launch',
      template: '🚀 Exciting News! We just launched [PRODUCT]. Be the first to try it. Check it out: [LINK]',
      category: 'marketing',
    },
    {
      title: 'Event Invitation',
      template: '🎊 You\'re invited to [EVENT] on [DATE]. Join us for an amazing experience! RSVP: [LINK]',
      category: 'marketing',
    },
  ],
  personal: [
    {
      title: 'Birthday Wish',
      template: '🎂 Happy Birthday [NAME]! Wishing you a wonderful day filled with joy and happiness! 🎉',
      category: 'personal',
    },
    {
      title: 'Thank You',
      template: 'Thank you so much for [REASON]! I really appreciate your help and support. 🙏',
      category: 'personal',
    },
    {
      title: 'Congratulations',
      template: '🎊 Congratulations on [ACHIEVEMENT]! You totally deserve this success! So proud of you! 🌟',
      category: 'personal',
    },
  ],
};

export const FORMATTING_OPTIONS = [
  { label: 'Bold', syntax: '*text*', example: '*bold*' },
  { label: 'Italic', syntax: '_text_', example: '_italic_' },
  { label: 'Strikethrough', syntax: '~text~', example: '~strikethrough~' },
  { label: 'Monospace', syntax: '```text```', example: '```code```' },
];

export const QR_STYLES = [
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'squares', label: 'Squares' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
];

export const MAX_MESSAGE_LENGTH = 4096;
export const OPTIMAL_MESSAGE_LENGTH = 500;
