import { generateWhatsAppLink, generateShareLink, formatWhatsAppText, analyzeMessageLength } from '../whatsapp';
import { WHATSAPP_BASE_URL } from '../constants';

describe('WhatsApp Utilities', () => {
  describe('generateWhatsAppLink', () => {
    it('should generate a basic link with only phone number', () => {
      const link = generateWhatsAppLink('919876543210');
      expect(link).toBe(`${WHATSAPP_BASE_URL}919876543210`);
    });

    it('should generate a link with phone and message', () => {
      const link = generateWhatsAppLink('919876543210', 'Hello World');
      expect(link).toBe(`${WHATSAPP_BASE_URL}919876543210?text=Hello%20World`);
    });

    it('should handle unformatted phone numbers', () => {
      const link = generateWhatsAppLink('+91 98765-43210');
      expect(link).toBe(`${WHATSAPP_BASE_URL}919876543210`);
    });
  });

  describe('generateShareLink', () => {
    it('should generate a share link with message', () => {
      const link = generateShareLink('Check this out!');
      expect(link).toBe(`${WHATSAPP_BASE_URL}?text=Check%20this%20out!`);
    });
  });

  describe('formatWhatsAppText', () => {
    it('should format bold text', () => {
      expect(formatWhatsAppText('hello', 'bold')).toBe('*hello*');
    });

    it('should format italic text', () => {
      expect(formatWhatsAppText('hello', 'italic')).toBe('_hello_');
    });

    it('should format strikethrough text', () => {
      expect(formatWhatsAppText('hello', 'strikethrough')).toBe('~hello~');
    });

    it('should format monospace text', () => {
      expect(formatWhatsAppText('hello', 'monospace')).toBe('```hello```');
    });
  });

  describe('analyzeMessageLength', () => {
    it('should suggest more details for short messages', () => {
      const analysis = analyzeMessageLength('Hi');
      expect(analysis.length).toBe(2);
      expect(analysis.isOptimal).toBe(false);
      expect(analysis.suggestion).toContain('more details');
    });

    it('should mark messages between 100 and 500 as optimal', () => {
      const longMessage = 'a'.repeat(200);
      const analysis = analyzeMessageLength(longMessage);
      expect(analysis.isOptimal).toBe(true);
      expect(analysis.suggestion).toContain('Perfect length');
    });

    it('should suggest being concise for messages over 500', () => {
      const longMessage = 'a'.repeat(600);
      const analysis = analyzeMessageLength(longMessage);
      expect(analysis.isOptimal).toBe(false);
      expect(analysis.suggestion).toContain('more concise');
    });

    it('should suggest breaking down messages over 1000', () => {
      const longMessage = 'a'.repeat(1100);
      const analysis = analyzeMessageLength(longMessage);
      expect(analysis.isOptimal).toBe(false);
      expect(analysis.suggestion).toContain('Break it into multiple');
    });
  });
});
