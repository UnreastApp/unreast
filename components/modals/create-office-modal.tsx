"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/utils/file-upload";

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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"



export const CreateOfficeModal = () => {
    
    const {isOpen, onClose, type} = useModal();
    const router = useRouter();
    
    const isModalOpen = isOpen && type === "createOffice";
    
    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Office name is required."
        }),
        imageUrl: z.string().min(1, {
            message: "Office image is required"
        })
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("api/offices", values);

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
                        Create your Office
                    </DialogTitle>
                    <DialogDescription className="text-center text-foreground/50">
                        Personalize your office with a name and photo. You can allways change it later.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8  px-6">

                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload 
                                                    endpoint="imageUploader"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

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
                                                className="" 
                                                placeholder="Enter office name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                        <p className="font-light text-xs">By creating a office, you agree to Unreast <a target="_blank" href="/guidelines" className="text-primary">Community Guidelines</a></p>
                                    </FormItem>
                            )}/>
                            
                        </div>
                        <DialogFooter>
                            <Button disabled={isLoading} onClick={() => onClose()}>Create</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}