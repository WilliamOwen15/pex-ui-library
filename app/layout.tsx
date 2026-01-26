import "fumadocs-ui/style.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Lora, Montserrat } from "next/font/google";
import type { ReactNode } from "react";
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
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <html
      className={`${montserrat.variable} ${lora.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
