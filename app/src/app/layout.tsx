import type { Metadata } from "next";
import { Kumbh_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const kumbhSans = Kumbh_Sans({
  variable: "--font-kumbh-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Craque",
  description: "Plataforma de gestão para escolinhas de futebol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${kumbhSans.variable} ${plusJakartaSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
