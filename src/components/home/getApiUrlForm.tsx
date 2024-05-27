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
}
export function GetApiUrlForm({ia_api_placeholder, ia_api_button, ia_api_error, ia_api_loading, ia_api_connected}: Props) {
    const [url, setUrl] = useState("")
    const { pending, data } = useFormStatus();
    const { toast } = useToast();
    const schema = z.string().url()

    useEffect(() => {
        if (data) {
            const url = data.get("url")
            fetch(schema.parse(url), {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    toast({
                        title: 'API Connected',
                        description: ia_api_connected,
                    })

                    // save the url in local storage
                    localStorage.setItem('ia_api_url', schema.parse(url))
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

    useEffect(() => {
        const url = localStorage.getItem('ia_api_url')
        if (url) {
            setUrl(url)
        }
    }, [])

    return(
        <>
            <Input className="flex-1" placeholder={ia_api_placeholder} type="url" name="url" required value={url} onChange={(e) => setUrl(e.target.value)} />
            <Button type="submit" disabled={pending}>{
                pending ? ia_api_loading : data ? ia_api_connected : ia_api_button
            }</Button>
        </>
    )
}