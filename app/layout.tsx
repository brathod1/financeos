import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/layout/sidebar";
import "./globals.css";
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
  title: "FinanceOS",
  description: "Personal Finance Operating System",
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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-black text-white">
        {user ? (
  <div className="flex min-h-screen">
    <Sidebar />

    <main className="flex-1 bg-[#050505] p-10">
      {children}
    </main>
  </div>
) : (
  <main className="min-h-screen bg-[#050505]">
    {children}
  </main>
)}
      </body>
    </html>
  );
}