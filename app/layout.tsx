import type { Metadata, Viewport } from "next";
import { Space_Mono, Inter } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://palakbhatt.dev"),
  title: "Palak Bhatt — AI, Design & Development",
  description:
    "Palak Bhatt — AI, Design & Development. Working at the intersection of AI, design, and product development to turn ideas into meaningful digital experiences.",
  keywords: [
    "Palak Bhatt",
    "AI, Design & Development",
    "AI Engineer",
    "Product Designer",
    "UI/UX Design",
    "Full Stack Development",
    "AbleCircle",
    "BML Munjal University",
  ],
  authors: [{ name: "Palak Bhatt" }],
  openGraph: {
    title: "Palak Bhatt — AI, Design & Development",
    description:
      "Palak Bhatt — AI, Design & Development. Working at the intersection of AI, design, and product development to turn ideas into meaningful digital experiences.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/creative-license.png",
        width: 2273,
        height: 1409,
        alt: "Palak's Creative License",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Palak Bhatt — AI, Design & Development",
    description:
      "Palak Bhatt — AI, Design & Development. Working at the intersection of AI, design, and product development to turn ideas into meaningful digital experiences.",
    images: ["/creative-license.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/avatar_o.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/avatar_o.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#92a878",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${spaceMono.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" href="/avatar_o.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Pixelify+Sans:wght@600;700&family=Silkscreen:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-neutral-900 antialiased min-h-screen flex flex-col selection:bg-[#9ab787] selection:text-neutral-900 font-space-mono">
        {children}
      </body>
    </html>
  );
}
