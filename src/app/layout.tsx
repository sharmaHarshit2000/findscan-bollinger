import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FindScan BB Demo",
  description: "Bollinger Bands demo using KLineCharts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-900 text-gray-100">
        {/* Header */}
        <header className="w-full bg-gray-800 p-4 shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            FindScan Bollinger Bands Demo
          </h1>
          <nav className="flex gap-4">
            <a href="#" className="hover:text-yellow-400 transition">
              Home
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              About
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              Docs
            </a>
          </nav>
        </header>

        {/* Page content */}
        <main className="p-4 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
