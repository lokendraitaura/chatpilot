import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../Navbar';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock framer-motion to avoid animation issues in tests
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

describe('Navbar Component', () => {
  it('renders the logo and brand name', () => {
    renderWithTheme(<Navbar />);
    expect(screen.getByText('Chat')).toBeInTheDocument();
    expect(screen.getByText('Pilot')).toBeInTheDocument();
  });

  it('toggles theme menu when palette icon is clicked', () => {
    renderWithTheme(<Navbar />);
    const themeButton = screen.getByLabelText('Change theme');
    fireEvent.click(themeButton);
    expect(screen.getByText('Custom Theme')).toBeInTheDocument();
    expect(screen.getByText('Preset Themes')).toBeInTheDocument();
  });

  it('contains links to Tools and AI Features', () => {
    renderWithTheme(<Navbar />);
    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('AI Features')).toBeInTheDocument();
  });
});
