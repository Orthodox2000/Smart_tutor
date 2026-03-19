import type { Metadata } from "next";

import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartIQ Academy",
  description:
    "Professional institute platform for SmartIQ Academy with role-based dashboards, local APIs, and a polished admissions experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <ThemeProvider>
          <div className="min-h-screen">
            <SiteHeader />
            {children}
            <SiteFooter />
            <FloatingWhatsApp />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
