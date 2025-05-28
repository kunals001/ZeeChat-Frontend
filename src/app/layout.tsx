import type { Metadata } from "next";
import { Josefin_Sans,Poppins } from 'next/font/google';
import Navbar from "@/components/Nav/Navbar";
import "./globals.css";

const Josefin = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ZeeChat",
  description: "Chatapp by Zee",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Josefin.variable} ${poppins.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
