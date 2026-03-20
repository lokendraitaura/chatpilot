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

export { MESSAGE_TEMPLATES } from './generated-templates';

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
