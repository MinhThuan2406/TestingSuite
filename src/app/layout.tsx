import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import TopNavBar from "@/components/TopNavBar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HardwareTest Pro",
  description: "Test your hardware instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <TopNavBar />
        <div className="flex-grow">
          {children}
        </div>
      </body>
    </html>
  );
}
