import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Wikipedia Bankruptcy/Fraud Scraper',
  description: "A tool for scraping Wikipedia pages for data on bankruptcy and fraud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
