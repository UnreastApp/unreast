import { OfficeWithMembersWithProfiles } from "@/types";

import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import { MemberRole } from "@prisma/client";
import qs from "query-string";
import axios from "axios";
import { useRouter } from "next/navigation";

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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuTrigger,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"

import { 
    ShieldAlert, 
    ShieldCheck, 
    User, 
    MoreVertical, 
    ShieldQuestion, 
    Check, 
    Gavel, 
    Loader2 
} from "lucide-react";
 
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/utils/user-avatar";


export const MembersModal = () => {

    const router = useRouter();
    const {onOpen ,isOpen, onClose, type, data} = useModal();
    const [loadingId, setLoadingId] = useState("");

    const isModalOpen = isOpen && type === "members";
    const  { office } = data as { office: OfficeWithMembersWithProfiles };


    const onKick = async (memberId: string) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    officeId: office?.id
                }
            });

            const response = await axios.delete(url);

            router.refresh();
            onOpen("members", { office: response.data })

        } catch (error) {
            console.log(error);
        } finally {
            setLoadingId("");
        }
    }

    const onRoleChange = async (memberId: string, role: MemberRole) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    officeId: office?.id
                }
            });

            const response = await axios.patch(url, {role});

            router.refresh();
            onOpen("members", {office: response.data})

        } catch (error) {
            console.log(error);
        } finally {
            setLoadingId("");
        }
    }
    

    const roleIconMap = {
        "GUEST": <User className="h-4 w-4 ml-2"/>,
        "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2"/>,
        "ADMIN": <ShieldAlert className="h-4 w-4 ml-2 text-primary"/>
    }
  

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose} >
            <DialogContent className="overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">
                        Manage Members
                    </DialogTitle>
                    <DialogDescription className="text-center text-foreground/50">
                        {office?.member?.length} Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {office?.member?.map((member) => (
                        <div key={member.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar src={member.profile.imageUrl}/>
                            <div className="flex flex-col gap-y-1">
                                <div className="text-xs flex items-center font-medium">
                                    {member.profile.name}
                                    {roleIconMap[member.role]}
                                </div>
                                <p className="text-xs text-foreground/80">
                                    {member.profile.email}
                                </p>
                            </div>
                            {office.profileId !== member.profileId && loadingId !== member.id && (
                                <div className="ml-auto">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreVertical className="h-4 w-4 text-foreground/50 border-none"/>
                                            <DropdownMenuContent side="left">
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger className="flex items-center">
                                                        <ShieldQuestion className="w-4 h-4 mr-2"/>
                                                        <span>Role</span>
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuPortal>
                                                        <DropdownMenuSubContent>
                                                            <DropdownMenuItem onClick={() => onRoleChange(member.id, "GUEST")}>
                                                                <User className="h-4 w-4 mr-2"/>
                                                                Guest
                                                                {member.role === "GUEST" && (
                                                                    <Check className="h-4 w-4 ml-auto"/>
                                                                )}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => onRoleChange(member.id, "MODERATOR")}>
                                                                <ShieldCheck className="h-4 w-4 mr-2"/>
                                                                Moderator
                                                                {member.role === "MODERATOR" && (
                                                                    <Check className="h-4 w-4 ml-auto"/>
                                                                )}
                                                            </DropdownMenuItem>
                                                        </DropdownMenuSubContent>
                                                    </DropdownMenuPortal>
                                                </DropdownMenuSub>
                                                <DropdownMenuSeparator/>
                                                <DropdownMenuItem onClick={() => onKick(member.id)}>
                                                    <Gavel className="h-4 w-4 mr-2"/>
                                                    Kick
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenuTrigger>
                                    </DropdownMenu>
                                </div>
                            )}
                            {loadingId === member.id && (
                                <Loader2 className="animate-spin text-foreground/50 ml-auto h-4 w-4"/>
                            )}
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}