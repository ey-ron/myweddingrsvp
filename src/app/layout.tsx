import type { Metadata, Viewport } from 'next';
import { Alex_Brush, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const alexBrush = Alex_Brush({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-alex-brush',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aaronandeileenwedding.vercel.app'),
  title: 'Save the Date | Aaron & Eileen',
  description: 'We are getting married on Sunday, April 11, 2027! Please save the date and RSVP for our wedding celebration.',
  openGraph: {
    type: 'website',
    title: 'Save the Date | Aaron & Eileen',
    description: 'We are getting married on Sunday, April 11, 2027! Please save the date and RSVP for our wedding celebration.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 598, alt: 'Aaron & Eileen Wedding Celebration' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Save the Date | Aaron & Eileen',
    description: 'We are getting married on Sunday, April 11, 2027! Please save the date and RSVP for our wedding celebration.',
    images: ['/og-image.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#FAF8F5',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${alexBrush.variable} ${playfair.variable} ${jakarta.variable}`}>
      <body className="bg-[#FAF8F5] text-[#2A2725] antialiased selection:bg-[#B89B6D] selection:text-white">
        {children}
      </body>
    </html>
  );
}
