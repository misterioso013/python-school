import {schema, schemaHistory} from '../components/chat/schemas'

export const getHistory = async (url: string, setChat: any, toast: any) => {
    try {
        const response = await fetch(schema.parse(url) + '/history', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        setChat(schemaHistory.parse(data))
        toast({
            title: 'Chat History',
            description: 'Chat history loaded successfully',
        })
    } catch (error) {
        toast({
            title: 'Chat History',
            description: 'Error loading chat history, please verify the URL and try again',
        })
    }
}