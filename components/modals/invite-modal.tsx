import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import axios from "axios";



export const InviteModal = () => {

    const {onOpen ,isOpen, onClose, type, data} = useModal();
    const origin = useOrigin();

    const isModalOpen = isOpen && type === "invite";
    const  { office } = data;
  
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const inviteUrl = `${origin}/invite/${office?.inviteCode}`;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
    };

    const onNew = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/offices/${office?.id}/invite-code`);

            onOpen("invite", {office: response.data});
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose} >
            <DialogContent className="overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">
                        Invite People
                    </DialogTitle>
                    <DialogDescription className="text-center text-foreground/50">
                        Invite people who work with you to your office.
                    </DialogDescription>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs">
                        Office invite link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input value={inviteUrl} disabled={isLoading} />
                        <Button onClick={onCopy} disabled={isLoading} size="icon" className="bg-transparent hover:bg-transparent">
                            {copied ? <Check className="w-4 h-4 text-primary"/> : <Copy className="w-4 h-4 text-primary"/> }
                        </Button>
                    </div>
                    <Button disabled={isLoading} onClick={onNew} className="p-0 bg-transparent hover:bg-transparent text-foreground/50 mt-4">
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2"/>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}