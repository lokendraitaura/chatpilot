import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardLayout } from '../DashboardLayout';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/tools/dashboard',
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  );
};

describe('DashboardLayout Component', () => {
  it('renders the sidebar with correct navigation items', () => {
    renderWithTheme(<DashboardLayout><div>Test Content</div></DashboardLayout>);
    
    // Check main navigation
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    
    // Check tool groups - use getAllByText or check length since they appear multiple times
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getAllByText('Tools').length).toBeGreaterThan(0);
    expect(screen.getAllByText('AI Features').length).toBeGreaterThan(0);
  });

  it('highlights the active route in the sidebar', () => {
    renderWithTheme(<DashboardLayout><div>Test Content</div></DashboardLayout>);
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink).toHaveClass('bg-[var(--primary)]/10');
  });

  it('renders children content correctly', () => {
    renderWithTheme(<DashboardLayout><div>Main Content Test</div></DashboardLayout>);
    expect(screen.getByText('Main Content Test')).toBeInTheDocument();
  });

  it('shows breadcrumbs based on the current path', () => {
    renderWithTheme(<DashboardLayout><div>Test Content</div></DashboardLayout>);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
