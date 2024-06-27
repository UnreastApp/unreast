"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Office, Profile } from "@prisma/client";
import { ShieldAlert, ShieldCheck, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { UserAvatar } from "@/components/utils/user-avatar";
import { profile } from "console";

interface OfficeMemberProps {
    member: Member & {profile: Profile};
    office: Office;
}

const roleIconMap = {
    [MemberRole.GUEST]: <User className="mr-2 h-4 w-4"/>,
    [MemberRole.MODERATOR]: <ShieldCheck className="mr-2 h-4 w-4"/>,
    [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-primary"/>
}

export const OfficeMember = ({member, office}: OfficeMemberProps) => {

    const params = useParams();
    const router = useRouter();

    const icon = roleIconMap[member.role];

    return(
        <button className={cn("group px-2 py-2 text-sm font-medium text-foreground rounded-sm flex items-center gap-x-2 w-full hover:bg-border")}>
            <UserAvatar src={member.profile.imageUrl} className="h-8 md:h-8 md:w-8"/>
            <p className="font-medium text-sm">
                {member.profile.name}
            </p>
            {icon}
        </button>
    )
}
