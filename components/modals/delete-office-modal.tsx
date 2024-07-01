"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";


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

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";




export const DeleteOfficeModal = () => {

    const {isOpen, onClose, type, data} = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "deleteOffice";
    const  { office } = data;

    const [isLoading, setIsLoading] = useState(false);
    
    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Office name is required."
        }).refine(
            name => name === office?.name,
            {
                message: "Office name is incorrect"
            }
        )
    });
  
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.delete(`/api/offices/${office?.id}/delete`);
            onClose();
            router.refresh();
            router.push("/app");
        } catch (error) {
            console.log("error");
        }
    }


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose} >
            <DialogContent className="overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">
                        Delete Office
                    </DialogTitle>
                    <DialogDescription className="text-center text-foreground/50">
                        Do you really want to delete <span className="font-bold text-primary/70">{office?.name}</span>?
                        <span className="font-bold"> <br/>This action is irreversible.</span>
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8  px-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs">
                                            Office Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                placeholder="Enter office name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="px-6 py-4">
                            <div className="flex items-center justify-between w-full">
                                <Button disabled={isLoading} onClick={onClose} variant="ghost">
                                    Cancel
                                </Button>
                                <Button disabled={isLoading} variant="default">
                                    Delete the office
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}