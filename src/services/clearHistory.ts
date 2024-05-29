import {schema} from '../components/chat/schemas'

export const clearHistory = async (url: string, setChat: any, toast: any) => {
    const response = await fetch(schema.parse(url) + '/clear', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const status = response.status
    if(status === 200) {
        setChat({status: 'success', history: []})
        toast({
            title: 'Chat History',
            description: 'Chat history cleared successfully',
        })
    }
}