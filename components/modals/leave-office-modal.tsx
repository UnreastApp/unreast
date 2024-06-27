import { Button } from "@/components/ui/button";

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


import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



export const LeaveOfficeModal = () => {

    const {isOpen, onClose, type, data} = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "leaveOffice";
    const  { office } = data;
  
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            await axios.patch(`/api/offices/${office?.id}/leave`);
            onClose();
            router.push("/app")
        } catch (error) {
            console.log("error");
        }
    }


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose} >
            <DialogContent className="overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">
                        Leave Office
                    </DialogTitle>
                    <DialogDescription className="text-center text-foreground/50">
                        Do you really want to leave the <span className="font-bold text-primary/70">{office?.name}</span> 
                        ? You will no longer be able to enter until you are invited again.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button disabled={isLoading} onClick={onClose} variant="ghost">
                            Cancel
                        </Button>
                        <Button disabled={isLoading} onClick={onClick} variant="default">
                            Leave the office
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}