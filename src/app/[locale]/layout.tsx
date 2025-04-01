import { Inter, Chivo, Fira_Code, JetBrains_Mono, Source_Code_Pro } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap'
 });
const chivo = Chivo({ subsets: ["latin"],
  variable: '--font-chivo',
  display: 'swap'
 });

const fira_code = Fira_Code({ subsets: ["latin"],
  variable: '--font-fira-code',
  display: 'swap'

 });

const jetbrains_mono = JetBrains_Mono({ subsets: ["latin"],
  variable: '--font-jetbrains-mono',
  display: 'swap'
 });

const source_code_pro = Source_Code_Pro({ subsets: ["latin"],
  variable: '--font-source-code-pro',
  display: 'swap'
 });

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
    <ClerkProvider>
    <html lang={params.locale}>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased ",inter.variable,chivo.variable,fira_code.variable,jetbrains_mono.variable,source_code_pro.variable)}>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            </ThemeProvider>
          </body>
    </html>
    </ClerkProvider>
  );
}
