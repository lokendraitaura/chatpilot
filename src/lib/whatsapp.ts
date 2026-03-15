import { WHATSAPP_BASE_URL } from './constants';
import { formatPhoneNumber } from './utils';

export function generateWhatsAppLink(phone: string, message?: string): string {
  const formattedPhone = formatPhoneNumber(phone);
  const encodedMessage = message ? encodeURIComponent(message) : '';
  return `${WHATSAPP_BASE_URL}${formattedPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
}

export function generateShareLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `${WHATSAPP_BASE_URL}?text=${encodedMessage}`;
}

export function formatWhatsAppText(text: string, format: 'bold' | 'italic' | 'strikethrough' | 'monospace'): string {
  const formats = {
    bold: `*${text}*`,
    italic: `_${text}_`,
    strikethrough: `~${text}~`,
    monospace: `\`\`\`${text}\`\`\``,
  };
  return formats[format];
}

export function analyzeMessageLength(message: string): {
  length: number;
  isOptimal: boolean;
  suggestion: string;
} {
  const length = message.length;
  const isOptimal = length >= 100 && length <= 500;
  
  let suggestion = '';
  if (length < 100) {
    suggestion = 'Consider adding more details to make your message more informative.';
  } else if (length > 500 && length <= 1000) {
    suggestion = 'Your message is getting long. Consider making it more concise.';
  } else if (length > 1000) {
    suggestion = 'Message is too long. Break it into multiple messages for better readability.';
  } else {
    suggestion = 'Perfect length! Your message is clear and concise.';
  }

  return { length, isOptimal, suggestion };
}
