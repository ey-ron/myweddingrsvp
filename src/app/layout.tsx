import type { Metadata, Viewport } from 'next';
import './globals.css';
import { OrientationGuard } from '../components/OrientationGuard';

export const metadata: Metadata = {
  metadataBase: new URL('https://aaronandeileenwedding.vercel.app'),
  title: 'Save the Date | Aaron & Eileen',
  description: 'We are getting married on Sunday, April 11, 2027! Please save the date and RSVP for our wedding celebration.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
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
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Preload critical couple & venue photos for instant mobile display */}
        <link rel="prefetch" href="/IMG_1191.jpeg" as="image" />
        <link rel="prefetch" href="/mtcarmel.jpeg" as="image" />
        <link rel="prefetch" href="/riovilla.jpeg" as="image" />
        <link rel="prefetch" href="/thechapter.jpeg" as="image" />
        <link rel="prefetch" href="/greenery.jpeg" as="image" />
        <link rel="prefetch" href="/river%20safari.jpeg" as="image" />
        {/* Shield against Brave Wallet / Web3 extension injected errors */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function isWeb3Error(msg) {
                  if (!msg) return false;
                  var s = String(msg).toLowerCase();
                  return s.indexOf('ethereum') !== -1 || s.indexOf('selectedaddress') !== -1 || s.indexOf('brave') !== -1;
                }

                // Prevent Next.js React Dev Overlay from crashing or showing on extension errors
                window.addEventListener('error', function(e) {
                  if (isWeb3Error(e.message) || (e.error && isWeb3Error(e.error.message))) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return true;
                  }
                }, true);

                window.addEventListener('unhandledrejection', function(e) {
                  var r = e.reason;
                  if (r && (isWeb3Error(r.message) || isWeb3Error(r))) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return true;
                  }
                }, true);

                // Polyfill selectedAddress safely on window.ethereum if injected by Brave
                function patchEth(target) {
                  if (target && typeof target === 'object' && !('selectedAddress' in target)) {
                    try {
                      Object.defineProperty(target, 'selectedAddress', {
                        get: function() { return null; },
                        set: function() {},
                        configurable: true,
                        enumerable: true
                      });
                    } catch (_) {}
                  }
                }

                try {
                  var _eth = window.ethereum;
                  if (_eth) {
                    patchEth(_eth);
                  }
                  Object.defineProperty(window, 'ethereum', {
                    configurable: true,
                    enumerable: true,
                    get: function() { return _eth; },
                    set: function(val) {
                      _eth = val;
                      patchEth(_eth);
                    }
                  });
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[#FAF8F5] text-[#2A2725] antialiased selection:bg-[#B89B6D] selection:text-white">
        <OrientationGuard />
        {children}
      </body>
    </html>
  );
}
