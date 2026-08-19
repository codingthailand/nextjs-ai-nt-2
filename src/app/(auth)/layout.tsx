import type { Metadata } from "next";
import { Prompt, Nunito, Poppins, Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const poppins = Poppins({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const promptFont = Prompt({
  weight: ["400", "500", "700"],
  subsets: ["thai"],
  display: "swap",
  variable: "--font-prompt",
});


export const metadata: Metadata = {
  title: "ShopVibe — ล็อกอิน",
  description: "เรียนรู้การเขียน Next.js",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(
        "font-sans",
        nunito.variable,
        poppins.variable,
        spaceMono.variable,
        promptFont.variable
      )}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
