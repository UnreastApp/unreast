import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useModal } from "@/hooks/use-modal-store";

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
import { Copy, RefreshCw } from "lucide-react";



export const InviteModal = () => {

    const {isOpen, onClose, type} = useModal();

    const isModalOpen = isOpen && type === "invite";

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose} >
            <DialogContent className="overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">
                        Invite People
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Invite people who work with you to your office.
                    </DialogDescription>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs">
                        Office invite link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input value="Invite Link" />
                        <Button size="icon" className="bg-transparent hover:bg-transparent">
                            <Copy className="w-4 h-4"/>
                        </Button>
                    </div>
                    <Button variant="link" className="p-0 bg-transparent hover:bg-transparent text-zinc-400 mt-4">
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2"/>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}