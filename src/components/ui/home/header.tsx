import Link from "next/link"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { CheckIcon, GraduationCap, Languages, MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

type MenuItem = Array<{
    title: string
    href: string
    external?: boolean
}>

export function Header({locale}: {locale: string}) {
  const t = useTranslations('header')
    const menuItems: MenuItem = [
        {
            title: t('home'),
            href: "/"
        },
        {
            title: t('dashboard'),
            href: "/dashboard"
        },
        {
            title: t('modules'),
            href: "/dashboard/modules"
        },
        {
            title: t('about'),
            href: "https://github.com/misterioso013/python-school",
            external: true
        }
    ]

    return (
        <header className="bg-gray-100 dark:bg-gray-800 w-full py-4 md:py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link className="flex items-center gap-2 text-lg font-semibold" href={`/${locale}`}>
            <GraduationCap className="w-6 h-6"/>
            <span className="sr-only">Python School</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {menuItems.map((item, index) => (
                <Link key={index} className="text-gray-500 dark:text-gray-400 hover:underline" href={item.external ? item.href : `/${locale}${item.href}`} target={item.external ? "_blank" : ""}>
                    {item.title}
                </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-1" variant="link">
                  {t('languages')}
                  <Languages className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>
                  <Link className="flex items-center justify-between" href="/en">
                    <span>English</span>
                    {locale === "en" &&
                    <CheckIcon className="w-4 h-4" />
                    }
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className="flex items-center justify-between" href="/pt-BR">
                    <span>Português (Brasil)</span>
                    {locale === "pt-BR" &&
                    <CheckIcon className="w-4 h-4" />
                    }
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="rounded-full md:hidden" size="icon" variant="ghost">
                  <MenuIcon className="w-6 h-6" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="p-4 space-y-4 flex flex-col">
                    {menuItems.map((item, index) => (
                        <Link key={index} className="w-full font-semibold px-3" href={item.external ? item.href : `/${locale}${item.href}`} target={item.external ? "_blank" : ""}>
                            {item.title}
                        </Link>
                    ))}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="flex items-center gap-1" variant="link">
                      {t('languages')}
                        <Languages className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-40">
                      <DropdownMenuItem>
                        <Link className="flex items-center justify-between" href="#">
                          <span>English</span>
                          <CheckIcon className="w-4 h-4" />
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link className="flex items-center justify-between" href="#">
                          <span>Português (Brasil)</span>
                          <CheckIcon className="w-4 h-4" />
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    )
}