import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(inter.className, "antialiased")}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
