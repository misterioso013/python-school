import { GetApiUrlForm } from './getApiUrlForm'
import { useTranslations } from 'next-intl'
export async function GetApiUrl() {
    "use server"
    const i = useTranslations('home')


    return(
        <form className="flex w-full max-w-sm items-center space-x-2" action={handler}>
            <GetApiUrlForm ia_api_placeholder={i('ia_api_placeholder')} ia_api_button={i('ia_api_button')} ia_api_error={i('ia_api_error')} ia_api_loading={i('ia_api_loading')} ia_api_connected={i('ia_api_connected')} />
        </form>
    )
}

async function handler(form: FormData){
    "use server"
    return form
}