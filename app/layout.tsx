import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/layout/sidebar";
import { redirect } from "next/navigation";
import { MobileNav } from "@/components/layout/mobile-nav";
import "./globals.css";
import {
  MobileHeader
}
from "@/components/layout/mobile-header";
 import { createClient } from "@/supabase/server";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "North",
  description: "Track. Plan. Grow.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

const {
  data: { user },
} = await supabase.auth.getUser();
console.log("LAYOUT USER:", user?.email);
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-black text-white">
        {user ? (
  <>
  <MobileHeader />
    <div className="flex min-h-screen">
      <Sidebar />

      <main
        className="
        flex-1
        bg-[#050505]
        p-4
        md:p-10
        pb-24
        md:pb-10
        "
      >
        {children}
      </main>
    </div>

    <MobileNav />
  </>
) : (
  <main className="min-h-screen bg-[#050505]">
    {children}
  </main>
)}
      </body>
      
    </html>
  );
}