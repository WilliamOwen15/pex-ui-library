"use client";

import { Home, Type } from "lucide-react";
import { Lora, Montserrat } from "next/font/google";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/b37/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${lora.variable} antialiased`}>
        <SidebarProvider>
          <AppSidebar
            appIcon={Home}
            appName="PEx UI Library"
            navGroups={[
              {
                label: "Components",
                items: [
                  { title: "Title", href: "/examples/title", icon: Type },
                ],
              },
            ]}
          />
          <SidebarInset>
            <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
              <SidebarTrigger className="md:hidden" />
              <div className="flex-1" />
            </header>
            <div className="flex-1 overflow-auto p-6">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
