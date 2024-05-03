import { Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image"
import { useTranslations } from "next-intl"

export function Footer() {
    const t = useTranslations('footer')
    return(
        <footer className="bg-gray-100 dark:bg-gray-800 w-full py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Python School. {t('copyright')}</p>
          <nav className="flex items-center gap-4 md:gap-6 text-sm font-medium">
            <Link className="text-gray-900 dark:text-gray-50 hover:underline" href="/privacy">
              {t('privacy')}
            </Link>
            <Link className="text-gray-900 dark:text-gray-50 hover:underline" href="/terms">
                {t('terms')}
            </Link>
            <Link className="text-gray-900 dark:text-gray-50 hover:underline" href="https://all.dev.br" target="_blank">
                {t('contact')}
            </Link>
            <Link className="text-gray-900 dark:text-gray-50 hover:underline" href="https://github.com/misterioso013/python-school">
            <Github className="w-5 h-5" />
            </Link>
          </nav>
          <Link href="https://vercel.com/?utm_source=all.dev.br&utm_medium=python-school&utm_campaign=website" target="_blank"><Image alt="Vercel Logo" height={24} src="/vercel.svg" width={72} /></Link>
        </div>
      </footer>
    )
}