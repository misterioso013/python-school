import { Trash2} from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"

export function ClearChatConfirmation({clearChat} : {clearChat: () => void}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button className="bg-red-500 text-white">
                <Trash2 />
                </Button>
                </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Clear Chat History</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    Are you sure you want to clear the chat history?
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={clearChat}>Yes</AlertDialogAction>
                    <AlertDialogCancel>No</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
    )
}