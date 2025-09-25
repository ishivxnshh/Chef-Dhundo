
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chef Dhundo",
  description: "Chef Dhun - Your Personal Chef",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Hardcoded Clerk publishable key for build
  //const publishableKey = 'pk_live_Y2xlcmsuY2hlZmRodW5kby5jb20k';
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en">
        <head></head>
        <body className={inter.className}>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster
            toastOptions={{
              classNames: {
                toast: 'bg-white border-gray-200',
                title: 'text-black',
                description: 'text-gray-600',
                actionButton: 'bg-gray-800 text-white',
                cancelButton: 'bg-gray-200 text-black',
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
