import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({params: {locale}} : {params: {locale: string}}) {
  const t = await getTranslations({locale, namespace: 'head'});
 
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={params.locale}>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",inter.className)}>{children}</body>
    </html>
  );
}
