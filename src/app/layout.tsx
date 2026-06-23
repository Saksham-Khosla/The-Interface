import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "The Inference — How AI Is Changing Every Industry",
    template: "%s | The Inference",
  },
  description:
    "The Inference is a weekly intelligence briefing on how AI is reshaping finance, education, law, healthcare, startups, media, and the future of work.",
  keywords: [
    "AI newsletter",
    "AI in finance",
    "AI in healthcare",
    "AI in law",
    "AI in education",
    "future of work",
    "The Inference",
  ],
  authors: [{ name: "The Inference" }],
  openGraph: {
    type: "website",
    siteName: "The Inference",
    title: "The Inference — How AI Is Changing Every Industry",
    description:
      "A weekly briefing breaking down how AI is reshaping finance, education, law, healthcare, startups, media, and work.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Inference — How AI Is Changing Every Industry",
    description:
      "A weekly briefing on how AI is reshaping every industry — without the hype.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#040710] antialiased">
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
