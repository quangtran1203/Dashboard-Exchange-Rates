import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Exchange Rates Dashboard",
  description: "A Next.js app displaying exchange rate data for 3 currencies (USD, CAD, EUR) for the span of 2 years.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
