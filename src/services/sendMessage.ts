import {schemaPromptResponse, schema} from '../components/chat/schemas'

export const sendMessage = async (topic: string, prompt: string, history: boolean, chat: any, setChat: any, setPrompt: any, url: string, toast: any) => {
    try {
        setChat({...chat, history: [...chat.history, {role: 'user', parts: [{text: prompt}]}]})
    setPrompt('')
    
    const response = await fetch(schema.parse(url) + '/prompt', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({topic: topic, input: prompt, history: history})
    })
    const data = await response.json()
    const parsedData = schemaPromptResponse.parse(data)

    setChat({...chat, history: [...chat.history, {role: 'user', parts: [{text: prompt}]}, {role: 'model', parts: [{text: parsedData.response}]}]})
    } catch (error) {
        toast({
            title: 'Error',
            description: 'Error sending message, please try again',
        })
    }
        
}