"use client";

import { Channel, ChannelType, MemberRole, Office } from "@prisma/client";
import { Hash, Mic, Settings, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/utils/action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";


interface OfficeChannelProps {
    channel: Channel;
    office: Office;
    role?: MemberRole;
}

const iconMap = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video

}

export const OfficeChannel = ({channel, office, role}: OfficeChannelProps) => {

    const  { onOpen } = useModal();

    const params = useParams();
    const router = useRouter();

    const Icon = iconMap[channel.type];

    const onClick = () => {
        router.push(`/offices/${params?.officeId}/channels/${channel.id}`)
    }

    const onAction = (e: React.MouseEvent, action: ModalType) => {
        e.stopPropagation();
        onOpen(action, {channel, office})
    }

    return(
        <button 
            onClick={onClick} 
            className={cn("group px-2 py-2 text-s font-medium rounded-sm flex items-center gap-x-2 w-full hover:bg-border")}
        >
            <Icon className="flex-shrink-0 w-5 h-5 text-foreground/60"/>
            <p className={cn("line-clamp-1 font-medium text-sm text-foreground/60")}>
                {channel.name}
            </p>
            {role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ActionTooltip label="Edit">
                        <Settings onClick={(e) => onAction(e, "editChannel")} className="hidden group-hover:block w-4 h-4 text-foreground/60"/>
                    </ActionTooltip>
                    <ActionTooltip label="Delete">
                        <Trash onClick={(e) => onAction(e, "deleteChannel")} className="hidden group-hover:block w-4 h-4 text-foreground/60"/>
                    </ActionTooltip>
                </div>
            )}
        </button>
    )
}
