import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps extends HTMLMotionProps<'button'> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, isLoading, variant = 'primary', size = 'md', leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'gradient-primary text-white shadow-lg shadow-[var(--primary)]/20',
      secondary: 'bg-muted hover:bg-muted/80 text-foreground',
      outline: 'border-2 border-border hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 text-foreground',
      ghost: 'hover:bg-muted text-muted-foreground',
      danger: 'bg-red-500 hover:bg-red-600 text-white',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        disabled={disabled || isLoading}
        className={cn(
          'relative inline-flex items-center justify-center rounded-2xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer overflow-hidden',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        <span className={cn('flex items-center gap-2 transition-all', isLoading && 'opacity-0')}>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children as React.ReactNode}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </span>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
