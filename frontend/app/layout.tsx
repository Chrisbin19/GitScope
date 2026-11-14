import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Sora } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GitScope | AI-powered GitHub developer analysis",
    template: "%s | GitScope",
  },
  description:
    "GitScope analyzes public GitHub profiles and repositories to generate AI-powered insights into a developer's skills, languages, tools, and technical activity.",
  applicationName: "GitScope",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "GitScope",
    title: "GitScope | AI-powered GitHub developer analysis",
    description:
      "Analyze public GitHub profiles and repositories with AI-powered insights into languages, tools, and developer activity.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${sora.variable} ${jetBrainsMono.variable}`}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
