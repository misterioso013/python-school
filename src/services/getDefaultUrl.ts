import { cookies } from 'next/headers'

export async function getDefaultUrl() {
    "use server"
    const cookieStore = cookies()
    return cookieStore.has('ia_api_url') ? cookieStore.get('ia_api_url')?.value : undefined

}