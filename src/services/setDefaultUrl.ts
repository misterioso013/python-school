import { cookies } from 'next/headers'

export async function setDefaultUrl(url: string): Promise<boolean> {
    "use server"
    const cookieStore = cookies()
    cookieStore.set('ia_api_url', url)
    return true
}