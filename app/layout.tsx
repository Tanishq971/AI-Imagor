import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {ClerkProvider} from '@clerk/nextjs'

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Imagify",
  description: "Ai powered image generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables:{colorPrimary:'#624cf5'}
    }}>
      <html lang="en">
        <body className={cn("font-plexSans antialiased", plexSans.variable)}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
