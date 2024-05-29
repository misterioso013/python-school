'use client'
import React, { useEffect, useState, useRef } from "react"
import { X, Bot, SendHorizontal} from "lucide-react"
import {Code} from "@/components/Code"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"

  import { useToast } from "@/components/ui/use-toast"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { z } from "zod"
import {schema, schemaHistory} from "./schemas"
import { clearHistory } from "@/services/clearHistory"
import { getHistory } from "@/services/getHistory"
import {sendMessage } from "@/services/sendMessage"
import { ClearChatConfirmation } from "./clearChatConfirmation"
type Props = {
    topic: string
    history: boolean
}

export function ChatLayout({topic, history}: Props) {
    const [chat, setChat] = useState<z.infer<typeof schemaHistory>>({status: 'success', history: []})
    const [url, setUrl] = useState<string>('')
    const [prompt, setPrompt] = useState('')
    const chatRef = useRef<HTMLDivElement>(null)
    
    
    const urlValid = schema.safeParse(url)
    const { toast } = useToast()

    const chatHistory = chat.history.length === 0 ? (
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

    useEffect(() => {
        const getUrl = localStorage.getItem('ia_api_url')
        if(getUrl) {
            setUrl(getUrl)
        }
        if(urlValid.success) {
        getHistory(url, setChat, toast)
        }
    }, [url])

    const scrollToBottom = () => {
        chatRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest'
        })
    }
    useEffect(() => {
        scrollToBottom()
    }, [chat])

    const clearChat = () => clearHistory(url, setChat, toast)
    const send = () => sendMessage(topic, prompt, history, chat, setChat, setPrompt, url)
        
    // if url is not valid, return early
    if (!urlValid.success) {
        return
    }
    return (
        <Drawer>
  <DrawerTrigger className="fixed bottom-16 right-4">
    <Button>
        <Bot />
    </Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader className="flex items-center justify-between">
      <DrawerTitle>
        <Bot />
      </DrawerTitle>
      <DrawerDescription>
        {topic}
      </DrawerDescription>
        <DrawerClose>
            <X />
        </DrawerClose>
    </DrawerHeader>
    <ScrollArea className="h-[400px]" style={{userSelect: 'text'}}>
        <div className="flex flex-col items-center">
        <div ref={chatRef} className="p-4 flex flex-col gap-4 items-start">
        {chatHistory}
        </div>
        </div>
    </ScrollArea>
    <DrawerFooter className="flex flex-row">
        <Textarea placeholder="Type a message" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <div className="flex flex-col gap-4">
            <Button onClick={send}>
                <SendHorizontal />
            </Button>
            <ClearChatConfirmation clearChat={clearChat} />
            </div>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

    )
}

