"use client";

import qs from "query-string";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

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

import { Button } from "@/components/ui/button";




export const DeleteChannelModal = () => {

    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "deleteChannel";
    const { office, channel } = data;

    const [isLoading, setIsLoading] = useState(false);


    const onClick = async () => {
        try {
            setIsLoading(true);

            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}/delete`,
                query: {
                    officeId: office?.id,
                }
            })

            await axios.delete(url);

            onClose();
            router.push(`/offices/${office?.id}`);
            router.refresh();
        } catch (error) {
            console.log("error");
        }
    }


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose} >
            <DialogContent className="overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription className="text-center text-foreground/50">
                        Do you really want to delete <span className="font-bold text-primary/70">{channel?.name}</span>?
                        <span className="font-bold"> <br />This action is irreversible.</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-between w-full">
                    <Button disabled={isLoading} onClick={onClose} variant="ghost">
                        Cancel
                    </Button>
                    <Button disabled={isLoading} onClick={onClick} variant="default">
                        Delete the channel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}