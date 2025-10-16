import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import Header from './_components/header';
import './globals.css';
import Footer from '@/app/_components/footer';
import {HOME_OG_IMAGE_URL, SITE_NAME, SITE_URL} from '@/lib/constants';
import cn from 'classnames';

const inter = Inter({subsets: ['latin']});

// import { Noto_Sans_JP } from "next/font/google";

// const notoSansJP = Noto_Sans_JP({
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME}`,
  description: `Toru Nakamura's blog about various topics.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/my-blog/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/my-blog/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/my-blog/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/my-blog/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/my-blog/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/my-blog/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/my-blog/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body
        className={cn(
          inter.className,
          'dark:bg-slate-900 dark:text-slate-400',
        )}>
        <Header />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
