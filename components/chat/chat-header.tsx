import { Hash, Menu } from "lucide-react";
import { UserAvatar } from "@/components/utils/user-avatar";
import SocketIndication from "@/components/utils/socket-indicator";

interface ChatHeaderProps {
    officeId?: string;
    name?: string;
    type: "channel" | "conversation";
    imageUrl?: string;
};


export const ChatHeader = ({name, type, imageUrl}: ChatHeaderProps) => {
    return (
        <div className="text-md text-foreground/50 font-medium px-3 flex items-center h-12 border-border border-b-2">
            {type === "channel" && (
                <Hash className="h-4 w-4 mr-2"/>
            )}
            {type === "conversation" && (
                <UserAvatar src={imageUrl} className="h-4 w-4 mr-2"/>
            )}
            <p className="font-medium text-md">
                {name}
            </p>
            <div className="ml-auto flex items-center">
                <SocketIndication/>
            </div>
        </div>
    )
}