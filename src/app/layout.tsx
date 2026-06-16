import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "The Inference — Weekly AI Intelligence",
    template: "%s | The Inference",
  },
  description:
    "A weekly newsletter breaking down the most important AI tools, trends, startups, and research — without the hype. Read by 12,000+ founders, builders, and operators.",
  keywords: ["AI newsletter", "artificial intelligence", "machine learning", "AI tools", "AI research", "The Inference"],
  authors: [{ name: "The Inference" }],
  openGraph: {
    type: "website",
    siteName: "The Inference",
    title: "The Inference — Weekly AI Intelligence",
    description:
      "A weekly newsletter breaking down the most important AI tools, trends, startups, and research — without the hype.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Inference — Weekly AI Intelligence",
    description:
      "A weekly newsletter breaking down AI tools, trends, and research — without the hype.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#050914] antialiased">
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
