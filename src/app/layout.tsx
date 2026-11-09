import type { Metadata, Viewport } from 'next';
import './globals.css';

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF8F5] text-[#2A2725] antialiased selection:bg-[#B89B6D] selection:text-white">
        {children}
      </body>
    </html>
  );
}
