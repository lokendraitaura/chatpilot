'use client';

import { useState } from 'react';
import { Copy, Check, Code, Phone, MousePointerClick, ChevronDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { useCopy } from '@/hooks/useCopy';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { COUNTRY_CODES, DEFAULT_COUNTRY, validatePhoneNumber, type CountryCode } from '@/lib/countryCodes';

export default function ButtonGeneratorPage() {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [text, setText] = useState('Chat on WhatsApp');
  const [color, setColor] = useState('#25D366');
  const [iconColor, setIconColor] = useState('#ffffff');
  const [variant, setVariant] = useState<'default' | 'rounded' | 'pill' | 'square' | '3d' | 'gradient' | 'outline'>('rounded');
  const [showDropdown, setShowDropdown] = useState(false);
  const { copied, copy } = useCopy();

  const fullPhone = phoneNumber ? `${selectedCountry.digits}${phoneNumber.replace(/\D/g, '')}` : '';
  const whatsappLink = generateWhatsAppLink(fullPhone);
  const validation = validatePhoneNumber(phoneNumber, selectedCountry);
  const isValid = phoneNumber.length > 0 && validation.valid;

  const getBorderRadius = () => {
    switch (variant) {
      case 'square': return '0px';
      case 'default': return '8px';
      case 'pill': return '9999px';
      case 'rounded': 
      case '3d':
      case 'gradient':
      case 'outline':
      default: return '16px';
    }
  };

  const getTailwindRadius = () => {
    switch (variant) {
      case 'square': return 'rounded-none';
      case 'default': return 'rounded-lg';
      case 'pill': return 'rounded-full';
      case 'rounded': 
      case '3d':
      case 'gradient':
      case 'outline':
      default: return 'rounded-2xl';
    }
  };

  const getButtonStyle = () => {
    const baseStyle = {
      backgroundColor: variant === 'outline' ? 'transparent' : color,
      color: variant === 'outline' ? color : 'white',
      borderRadius: getBorderRadius(),
      border: variant === 'outline' ? `2px solid ${color}` : 'none',
    };

    if (variant === '3d') {
      return {
        ...baseStyle,
        boxShadow: `0 4px 0 0 ${color}cc, 0 8px 15px rgba(0,0,0,0.1)`,
        transform: 'translateY(-2px)',
      };
    }

    if (variant === 'gradient') {
      return {
        ...baseStyle,
        backgroundImage: `linear-gradient(135deg, ${color}, ${color}dd)`,
      };
    }

    return baseStyle;
  };

  const embedCode = `<a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" style="background-color: ${variant === 'outline' ? 'transparent' : color}; color: ${variant === 'outline' ? color : 'white'}; padding: 12px 24px; border-radius: ${getBorderRadius()}; ${variant === 'outline' ? `border: 2px solid ${color};` : ''} ${variant === '3d' ? `box-shadow: 0 4px 0 0 ${color}cc;` : ''} text-decoration: none; display: inline-flex; align-items: center; font-weight: bold; font-family: sans-serif;">
  <svg viewBox="0 0 24 24" width="20" height="20" style="margin-right: 8px; fill: ${iconColor};" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  ${text}
</a>`;

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
        >
          <MousePointerClick className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold">WhatsApp Button Maker</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create beautiful, high-converting WhatsApp buttons for your website. No coding required.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-8">
          {/* Country Code + Phone */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4" /> WhatsApp Number
            </label>
            <div className="flex gap-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-4 py-4 rounded-xl border-2 border-border hover:border-[var(--primary)]/50 bg-background outline-none transition-all font-medium whitespace-nowrap cursor-pointer"
                >
                  <span className="text-xl">{selectedCountry.flag}</span>
                  <span className="text-sm font-bold">{selectedCountry.code}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute left-0 top-full mt-2 z-50 bg-card border border-border rounded-2xl shadow-xl overflow-y-auto max-h-64 min-w-[220px]"
                    >
                      {COUNTRY_CODES.map((country) => (
                        <button
                          key={`${country.name}-${country.code}`}
                          type="button"
                          onClick={() => { setSelectedCountry(country); setShowDropdown(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/50 transition-colors text-left cursor-pointer ${
                            selectedCountry.name === country.name ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-bold' : ''
                          }`}
                        >
                          <span className="text-lg">{country.flag}</span>
                          <span className="flex-1">{country.name}</span>
                          <span className="font-mono text-muted-foreground">{country.code}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex-1 relative">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder={`e.g. ${'9'.repeat(selectedCountry.minLength)}`}
                  maxLength={selectedCountry.maxLength}
                  className={`w-full p-4 rounded-xl border-2 bg-background outline-none transition-all font-medium ${
                    phoneNumber && !validation.valid ? 'border-red-400' :
                    phoneNumber && validation.valid ? 'border-green-500' : 'border-border focus:border-[var(--primary)]'
                  }`}
                />
                {phoneNumber && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {validation.valid
                      ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                      : <AlertCircle className="w-5 h-5 text-red-100" />}
                  </div>
                )}
              </div>
            </div>
            <AnimatePresence>
              {phoneNumber && !validation.valid && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-red-500 flex items-center gap-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {validation.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Button Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Button Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                />
                <span className="font-mono text-xs uppercase">{color}</span>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Icon Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={iconColor}
                  onChange={(e) => setIconColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                />
                <span className="font-mono text-xs uppercase">{iconColor}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Button Style</label>
            <div className="grid grid-cols-3 gap-2">
              {(['default', 'rounded', 'pill', 'square', '3d', 'gradient', 'outline'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVariant(v)}
                  className={`py-2 px-3 rounded-xl border-2 font-bold capitalize transition-all text-xs ${
                    variant === v 
                      ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]' 
                      : 'border-border hover:border-border/80 text-muted-foreground'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-8 flex flex-col space-y-8">
          <div className="bg-card border border-border rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-8">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Live Preview</h3>
            
            <a
              href={isValid ? whatsappLink : undefined}
              target="_blank"
              rel="noopener noreferrer"
              style={getButtonStyle()}
              className={`px-8 py-4 font-bold flex items-center space-x-3 transition-all ${
                isValid ? 'hover:scale-105 cursor-pointer' : 'opacity-60 cursor-not-allowed pointer-events-none'
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" style={{ fill: variant === 'outline' ? color : iconColor }} xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span>{text}</span>
            </a>
            
            {!isValid && (
              <p className="text-xs text-muted-foreground">Enter a valid number to activate the button</p>
            )}
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold uppercase text-xs text-muted-foreground tracking-widest flex items-center gap-2">
                <Code className="w-4 h-4" /> Embed Code
              </h3>
              <button
                onClick={() => copy(embedCode)}
                className="text-xs font-bold text-[var(--primary)] hover:underline cursor-pointer"
              >
                {copied ? 'Copied Code!' : 'Copy Code'}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-muted/50 border border-border text-[10px] overflow-x-auto font-mono text-muted-foreground whitespace-pre-wrap">
              {embedCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
