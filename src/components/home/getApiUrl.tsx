"use server";

import { GetApiUrlForm } from './getApiUrlForm'
import { useTranslations } from 'next-intl'
import { getDefaultUrl } from '@/services/getDefaultUrl'
import { setDefaultUrl } from '@/services/setDefaultUrl';
export async function GetApiUrl() {
    "use server"
    const i = useTranslations('home')

    const defaultUrl = await getDefaultUrl()
    async function handleSubmit(form: FormData) {
        "use server"
        if (!form.has('url')) {
            return
        }
        const url = form.get('url')
        await setDefaultUrl(url as string)
    }

    return(
        <form className="flex w-full max-w-sm items-center space-x-2" action={handleSubmit} method="POST">
            <GetApiUrlForm ia_api_placeholder={i('ia_api_placeholder')} ia_api_button={i('ia_api_button')} ia_api_error={i('ia_api_error')} ia_api_loading={i('ia_api_loading')} ia_api_connected={i('ia_api_connected')} defaultUrl={defaultUrl} />
        </form>
    )
}