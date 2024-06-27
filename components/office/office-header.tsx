"use client";

import { OfficeWithMembersWithProfiles } from "@/types";
import { MemberRole} from "@prisma/client";
import { ChevronDown, LogOut, Plus, Settings, Trash, UserPlus, Users } from "lucide-react";

import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import { useModal } from "@/hooks/use-modal-store";


interface OfficeHeaderProps {
    office: OfficeWithMembersWithProfiles;
    role?: MemberRole;

};

export const OfficeHeader = ({office, role}: OfficeHeaderProps) => {

    const { onOpen } = useModal();

    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = role == MemberRole.MODERATOR;
    const isGuest = role == MemberRole.GUEST;

    return(
        <DropdownMenu>

            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <button className="w-full text-sm font-medium text-foreground hover:bg-border/50 rounded-md px-3 flex items-center h-12">
                    {office.name}
                    <ChevronDown className="h-5 w-5 ml-auto"/>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 text-xs space-y-[2px]">
                {(isAdmin || isModerator) && (
                    <DropdownMenuItem
                        onClick={() => onOpen("invite", { office })}
                        className="cursor-pointer text-primary font-medium hover:bg-primary-foreground px-3 py-2">
                        Invite People
                        <UserPlus className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}

                <Separator/>

                {(isAdmin || isModerator) && (
                    <DropdownMenuItem 
                        onClick={() => onOpen("editOffice", {office})} 
                        className="cursor-pointer hover:bg-border font-medium px-3 py-2">
                        Office Settings
                        <Settings className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {(isAdmin || isModerator) && (
                    <DropdownMenuItem 
                        onClick={() => onOpen("members", {office})}
                        className="cursor-pointer hover:bg-border font-medium px-3 py-2">
                        Manage Members
                        <Users className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {(isAdmin || isModerator) && (
                    <DropdownMenuItem 
                        onClick={() => onOpen("createChannel", {office})}
                        className="cursor-pointer hover:bg-border font-medium px-3 py-2">
                        Create Channel
                        <Plus className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                <Separator/>
                {( isModerator || isGuest) && (
                    <DropdownMenuItem 
                    onClick={() => onOpen("leaveOffice", {office})}
                    className="cursor-pointer hover:bg-border font-medium text-destructive/80 px-3 py-2">
                        Leave Office
                        <LogOut className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {(isAdmin) && (
                    <DropdownMenuItem 
                    onClick={() => onOpen("deleteOffice", {office})}
                    className="cursor-pointer hover:bg-primary-foreground font-medium text-destructive/80 px-3 py-2">
                        Delete Office
                        <Trash className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}