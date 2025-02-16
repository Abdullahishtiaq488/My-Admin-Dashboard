import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { ToasterProvider } from "@/lib/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Admin Dashboard",
  description: "Admin dashboard to manage data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          
          <ToasterProvider />
          <div className="flex h-screen">
            <AppSidebar />
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}