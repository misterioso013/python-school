"use client"
import React, {useEffect, useState} from "react"
import { useFormStatus } from "react-dom";
import {z} from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

type Props = {
    ia_api_placeholder: string
    ia_api_button: string
    ia_api_error: string
    ia_api_loading: string
    ia_api_connected: string
    defaultUrl: string | undefined
}
export function GetApiUrlForm({ia_api_placeholder, ia_api_button, ia_api_error, ia_api_loading, ia_api_connected, defaultUrl}: Props) {
    const [url, setUrl] = useState(defaultUrl)
    const { pending, data, method, action } = useFormStatus();
    const { toast } = useToast();
    const schema = z.string().url()

    useEffect(() => {
        if (data) {
            fetch(schema.parse(data.get("url")), {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                console.log(response)
                if (response.ok) {
                    toast({
                        title: 'API Connected',
                        description: ia_api_connected,
                    })
                } else {
                    toast({
                        title: 'API Error',
                        description: ia_api_error,
                    })
                }
            }).catch(() => {
                toast({
                    title: 'API Error',
                    description: ia_api_error,
                })
            })

         }
    }, [data])

    return(
        <>
            <Input className="flex-1" placeholder={ia_api_placeholder} type="url" name="url" required value={url} onChange={(e) => setUrl(e.target.value)} />
            <Button type="submit" disabled={pending}>{
                pending ? ia_api_loading : data ? ia_api_connected : ia_api_button
            }</Button>
        </>
    )
}