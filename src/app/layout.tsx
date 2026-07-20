import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

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
  icons: {
    icon: [
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: { url: "/icon-180.png", sizes: "180x180", type: "image/png" },
  },
  openGraph: {
    type: "website",
    siteName: "The Inference",
    title: "The Inference — How AI Is Changing Every Industry",
    description:
      "A weekly briefing breaking down how AI is reshaping finance, education, law, healthcare, startups, media, and work.",
    images: [{ url: "/social-card-1200x630.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Inference — How AI Is Changing Every Industry",
    description:
      "A weekly briefing on how AI is reshaping every industry — without the hype.",
    images: ["/social-card-1200x630.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-bg text-ink antialiased">
        <Header />
        <main className="pt-[50px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
