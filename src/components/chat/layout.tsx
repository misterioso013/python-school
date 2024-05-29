'use client'
import React, { useEffect, useState, useRef } from "react"
import { X, Bot, SendHorizontal} from "lucide-react"
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
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { z } from "zod"
import { ChatHistory } from "./chat"
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
    const send = () => sendMessage(topic, prompt, history, chat, setChat, setPrompt, url, toast)
        
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
            <ChatHistory chat={chat} />
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

