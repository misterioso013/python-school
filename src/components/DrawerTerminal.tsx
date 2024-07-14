'use client'
import React,{useEffect, useState} from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"

type TerminalProps = {
    isOpen: boolean
    onClose: () => void
    code?: string
    children: React.ReactNode
}
export function DrawerTerminal({isOpen, onClose, children}: TerminalProps){
    const [terminalOpen, setTerminalOpen] = useState(isOpen)
    useEffect(() => {
        setTerminalOpen(isOpen)
        console.log(isOpen)
    }, [isOpen])
    return (
        <Drawer open={terminalOpen}
        onOpenChange={
            (e) => {
                setTerminalOpen(e)
                if(!e){
                    onClose()
                }
            }
        }>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Terminal</DrawerTitle>
                    <DrawerDescription>Run your Python code</DrawerDescription>
                </DrawerHeader>
                <div className='p-4'>
                {children}
                </div>
                <DrawerFooter>
                    <DrawerClose>Close</DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}