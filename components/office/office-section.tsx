"use client";

import { OfficeWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { ActionTooltip } from "../utils/action-tooltip";
import { ChevronDown, Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface OfficeSectionProps {
    label: string;
    role?: MemberRole;
    sectionType: "channels" | "members";
    channelType: ChannelType;
    office?: OfficeWithMembersWithProfiles;
};


export const OfficeSection = ({ label, role, sectionType, channelType, office }: OfficeSectionProps) => {

    const { onOpen } = useModal();

    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase text-foreground font-medium">
                {label}
            </p>
            {role !== MemberRole.GUEST && sectionType === "channels" && (
                <ActionTooltip label="Create Channel" side="right">
                    <button onClick={() => onOpen("createChannel", {channelType})}>
                        <Plus className="text-foreground h-4 w-4" />
                    </button>
                </ActionTooltip>
            )}
            {role === MemberRole.ADMIN && MemberRole.MODERATOR && sectionType === "members" && (
                <ActionTooltip label="Manage Members" side="top">
                    <button onClick={() => onOpen("members", {office})}>
                        <Settings className="text-foreground h-4 w-4" />
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}