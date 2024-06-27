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
import { useEffect } from "react";



// Error
const formSchema = z.object({
    name: z.string().min(1, {
        message: "Office name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "Office image is required"
    })
})


export const EditOfficeModal = () => {

    const {isOpen, onClose, type, data} = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "editOffice";

    const { office } = data;

    // Office form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    });

    useEffect(() => {
        if (office) {
            form.setValue("name", office.name);
            form.setValue("imageUrl", office.imageUrl);
        }
    }, [office, form]);

    const isLoading = form.formState.isSubmitting;

    // When the user clicks on "create office"
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/offices/${office?.id}/edit`, values);

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

    const createClose = () => {
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose} >
            <DialogContent className="overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">
                        Edit your Office
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">

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
                                    </FormItem>
                            )}/>
                            
                        </div>
                        <DialogFooter>
                            <Button disabled={isLoading} onClick={createClose}>Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}