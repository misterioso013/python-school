import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("head");
  return (
    <h1>{t('title')}</h1>
  );
}
