import type { Metadata } from "next";
import { Prompt, Roboto, Lora } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const loraHeading = Lora({subsets:['latin'],variable:'--font-heading'});

const roboto = Roboto({subsets:['latin'],variable:'--font-sans'});

export const promptFont = Prompt({
  weight: ['400', '500', '700'],
  subsets: ['thai'],
  display: 'swap'
});


export const metadata: Metadata = {
  title: "ระบบ ล็อกอิน",
  description: "เรียนรู้การเขียน Nex.tjs",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(promptFont.className, "font-sans", roboto.variable, loraHeading.variable)}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
