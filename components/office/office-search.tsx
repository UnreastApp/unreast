"use client";

import { Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command";


interface OfficeChannelsSearchProps {
    data: {
        label: string;
        type: "channel",
        data: {
            icon: React.ReactNode;
            name: string;
            id: string;
        }[] | undefined
    }[]
}

interface OfficeMemeberSearchProps {
    data: {
        label: string;
        type: "member",
        data: {
            icon: React.ReactNode;
            name: string;
            id: string;
        }[] | undefined
    }[]
}

export const ChannelsSearch = ({data}: OfficeChannelsSearchProps) => {

    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "C" && (e.shiftKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down)
    }, []);

    const onClick = ({id, type}: {id: string, type: "channel" }) => {
        setOpen(false);


        if (type === "channel") {
            return router.push(`/offices/${params?.officeId}/channels/${id}`)
        }
    }

    return (
        <>
            <button onClick={() => setOpen(true)} 
            className="group py-2 rounded-md font-medium flex items-center gap-x-2 w-full text-sm text-foreground/50 
            hover:text-foreground transition-all">
                <Search className="w-4 h-4"/>
                <p>Search Channels</p>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 
                rounded border px-1.5 text-[10px] ml-auto">
                    <span>SHIFT</span>C
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search all channels and members"/>
                <CommandList>
                    <CommandEmpty>
                        No results found
                    </CommandEmpty>
                    {data.map(({label, type, data}) => {
                        if(!data?.length) return null;
                        return (
                            <CommandGroup key={label} heading={label}>
                                {data?.map(({id, icon, name}) => {
                                    return (
                                        <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                                            {icon}
                                            <span>{name}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        )
                        
                    })}
                </CommandList>
            </CommandDialog>
        </>
    )
}


export const MemeberSearch = ({data}: OfficeMemeberSearchProps) => {

    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "M" && (e.shiftKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down)
    }, []);

    const onClick = ({id, type}: {id: string, type: "member"}) => {
        setOpen(false);

        if (type === "member") {
            return router.push(`offices/${id}/conversation/${id}`)
        }

    }

    return (
        <>
            <button onClick={() => setOpen(true)} 
            className="group py-2 rounded-md font-medium flex items-center gap-x-2 w-full text-sm text-foreground/50 
            hover:text-foreground transition-all">
                <Search className="w-4 h-4"/>
                <p>Search Members</p>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 
                rounded border px-1.5 text-[10px] ml-auto">
                    <span>SHIFT</span>M
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search all channels and members"/>
                <CommandList>
                    <CommandEmpty>
                        No results found
                    </CommandEmpty>
                    {data.map(({label, type, data}) => {
                        if(!data?.length) return null;
                        return (
                            <CommandGroup key={label} heading={label}>
                                {data?.map(({id, icon, name}) => {
                                    return (
                                        <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                                            {icon}
                                            <span>{name}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        )
                        
                    })}
                </CommandList>
            </CommandDialog>
        </>
    )
}