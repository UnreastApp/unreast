"use client";

import qs from "query-string";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChannelType } from "@prisma/client";


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

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue
} from "@/components/ui/select";
import { useEffect } from "react";





export const EditChannelModal = () => {
    
    const {isOpen, onClose, type, data} = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "editChannel";
    
    const {channel, office} = data;
    
    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Channel name is required."
        }).refine(
            name => name !== "general",
            {
                message: "Channel name cannot be 'general'"
            }
        ),
        type: z.nativeEnum(ChannelType)
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: channel?.type || ChannelType.TEXT,
        }
    });

    useEffect(() => {
        if (channel) {
            form.setValue("name", channel.name);
            form.setValue("type", channel.type)
        }
    }, [form, channel]);

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}/edit`,
                query: {
                    officeId: office?.id
                }
            });

            await axios.patch(url, values);

            form.reset();
            router.refresh();

        } catch (error) {
            console.log(error);
        }
    }
    
    const handleClose = () => {
        form.reset();
        router.refresh();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose} >
            <DialogContent className="overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">
                        Edit Channel
                    </DialogTitle>
                    <DialogDescription className="text-center text-foreground/50">
                        Edit the channel your way.
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
                                        <FormLabel className="uppercase">
                                            Channel Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}  
                                                placeholder="Enter channel name"
                                                {...field}
                                                className="bg-transparent"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                            )}/>
                            <FormField
                                control={form.control}
                                name="type"
                                render={({field}) => (
                                    <FormItem className="uppercase">
                                        <FormLabel>Channel Type</FormLabel>
                                        <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a channel type"/>
                                                    <SelectContent>
                                                        {Object.values(ChannelType).map((type) => (
                                                            <SelectItem key={type} value={type} className="capitalize">
                                                                {type.toLowerCase()}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </SelectTrigger>
                                            </FormControl>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="px-6 py-4">
                            <div className="flex items-center justify-between w-full">
                                <Button disabled={isLoading} onClick={onClose} variant="ghost">Cancel</Button>
                                <Button disabled={isLoading} onClick={() => onClose()}>Save</Button>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}