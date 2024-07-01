"use client";


import * as z from "zod";
import axios from "axios";
import qs from "query-string";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";

interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
    type: "conversation" | "channel";
}


export const ChatInput = ({apiUrl, query, name, type}: ChatInputProps) => {

    const {onOpen} = useModal();
    const router = useRouter();
    
    const formSchema = z.object({
        content: z.string().min(1),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query
            });

            await axios.post(url, values);
            form.reset();
            router.refresh();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField 
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-6">
                                    <button 
                                        type="button" 
                                        onClick={() => onOpen("messageFile", {apiUrl, query})} 
                                        className="absolute flex items-center justify-center p-1 bg-foreground/70 rounded-full text-card top-7 left-8 h-[24px] w-[24px]">
                                        <Plus/>
                                    </button>
                                    <Input 
                                        disabled={isLoading} 
                                        className="px-14 py-6 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        placeholder={`Messages ${type === "conversation" ? name : "#" + name}`}
                                        {...field}   
                                    />

                                    {/* Future Version (emoji)
                                    <div className="absolute top-7 right-8">
                                        <Smile/>
                                    </div>
                                    */}

                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}