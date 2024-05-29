import {Code} from "@/components/Code"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


type Chat = {
    history: {
        role: string
        parts: {
            text: string
        }[]
    }[]
}

export function ChatHistory({chat}: {chat: Chat}) {

    return chat.history.length === 0 ? (
        <div className="flex">
            <div className="flex-shrink-0">
                <Avatar>
                    <AvatarImage className="h-10 w-10" src="https://avatar.iran.liara.run/public/job/police/male" alt="model" />
                    <AvatarFallback>M</AvatarFallback>
                </Avatar>
            </div>
            <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">model</div>
                <div className="text-sm text-gray-500">
                    <Code textMarkdwon="Você tem alguma dúvida? Pergunte-me qualquer coisa!"
                    />
                </div>
            </div>
        </div>
    ) :
    chat.history.map((message, index) => {
        return (
            <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0">
                    {message.role === 'user' ? (
                    <Avatar>
                    <AvatarImage className="h-10 w-10" src="https://avatar.iran.liara.run/public" alt={message.role} />
                    <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    )
                    : (
                        <Avatar>
                    <AvatarImage className="h-10 w-10" src="https://avatar.iran.liara.run/public/job/police/male" alt={message.role} />
                    <AvatarFallback>M</AvatarFallback>
                    </Avatar>
                    )
                    }
    
                </div>
                <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{message.role}</div>
                    <div className="text-sm text-gray-500">
                        <Code textMarkdwon={message.parts[0].text} />
                        </div>
                </div>
            </div>
        )
    })
}