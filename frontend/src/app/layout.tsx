import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionAuthProvider from '@/context/SessionAuthProvider';
import Header from '@/components/Header';
import './globals.css'
import Script from 'next/script';
import config from '../config/config';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
           <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contact Manager</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet"/>
        <Header />
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${config.googleApiKey}&libraries=places`}
          strategy="beforeInteractive"
        />
        <main className='container-fluid'>
              <SessionAuthProvider>{children}</SessionAuthProvider>
        </main>
      </body>
    </html>
  );
}