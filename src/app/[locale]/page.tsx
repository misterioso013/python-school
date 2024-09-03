import Link from "next/link"
import { Header } from "@/components/home/header"
import { useTranslations } from "next-intl"
import { Footer } from "@/components/home/footer"
import { BriefcaseIcon, RocketIcon, SparklesIcon } from "lucide-react"
import { GetApiUrl } from "@/components/home/getApiUrl"
import { ChatLayout } from "@/components/chat/layout"
import Image from "next/image"

export default function Home({params: {locale}}: {params: {locale: string}}) {
  const t = useTranslations('home')
  return (
    <>
      <Header locale={locale} />
      <main className="flex flex-col items-center justify-center w-full">
        <section className="bg-gray-100 dark:bg-gray-800 w-full py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{t('title')}</h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md">
                {t('description')}
              </p>
              <div>
                <Link
                  className="inline-flex items-center justify-center rounded-md bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300 dark:focus:ring-offset-gray-800"
                  href={`/${locale}/dashboard`}
                >
                  {t('cta')}
                </Link>
              </div>
            </div>
            <Image
              alt="Python Programming"
              className="rounded-xl object-cover"
              height="400"
              src="/images/fibonacci.svg"
              style={{
                aspectRatio: "500/400",
                objectFit: "cover",
              }}
              width="500"
            />
          </div>
        </section>
        <section className="container mx-auto px-4 md:px-6 py-20 md:py-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <RocketIcon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
            <h3 className="text-2xl font-bold">{t("section_rocket_title")}</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t("section_rocket_description")}
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <BriefcaseIcon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
            <h3 className="text-2xl font-bold">{t('section_career_title')}</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t('section_career_description')}
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <SparklesIcon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
            <h3 className="text-2xl font-bold">{t('section_community_title')}</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t('section_community_description')}
            </p>
          </div>
        </section>
        <section className="bg-gray-100 dark:bg-gray-800 w-full py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("ai_title")}</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              {t("ai_description")} <Link href="#" className="hover:underline text-green-600">{t("ai_cta")}.</Link>
            </p>
            <div className="flex justify-center">
              <GetApiUrl />
            </div>
          </div>
        </section>
        <ChatLayout topic="Pagina inical do Python School" history={true} />
      </main>
      <Footer />
    </>
  )
}