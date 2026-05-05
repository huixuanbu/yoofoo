import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: "Yoofoo · 有福 - Discover Chinese Entertainment",
    template: "%s | Yoofoo · 有福",
  },
  description: "Discover the best Chinese TV dramas, movies, and shows. Curated for global audiences. 向世界讲好中国故事",
  keywords: ["Chinese drama", "C-drama", "Chinese movies", "Asian entertainment", "有福", "中国电视剧", "甄嬛传", "陈情令", "琅琊榜"],
  openGraph: {
    title: "Yoofoo · 有福 - Discover Chinese Entertainment",
    description: "The best Chinese TV dramas and movies, curated for global audiences",
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yoofoo · 有福",
    description: "Discover the best Chinese TV dramas and movies",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="antialiased bg-white text-gray-900">
        <Navbar />
        <main className="min-h-[calc(100vh-3.5rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
