import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import TopNavBar from "@/components/TopNavBar";
import { Providers } from "@/providers/Providers";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

// Material Symbols Outlined font
const materialSymbolsLink = (
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
);

export const metadata: Metadata = {
  title: "HardwareTest Pro",
  description: "Free online hardware testing tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>{materialSymbolsLink}</head>
      <body
        className={`${spaceGrotesk.variable} flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <Providers>
          <TopNavBar />
          <div className="flex-grow">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
