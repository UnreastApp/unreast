import { Hash, Mic, ShieldAlert, ShieldCheck, User, Video } from "lucide-react";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { MemeberSearch } from "./office-search";
import { OfficeSection } from "./office-section";
import { OfficeMember } from "./office-member";

interface OfficeSidebarProps {
    officeId: string;
}

const roleIconMap = {
    [MemberRole.GUEST]: <User className="mr-2 h-4 w-4"/>,
    [MemberRole.MODERATOR]: <ShieldCheck className="mr-2 h-4 w-4"/>,
    [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-primary"/>
}

export const OfficeMemberSidebar = async ({officeId}: OfficeSidebarProps) => {

    const profile = await currentProfile();

    if(!profile) {
        redirect("/")
    }

    const office = await db.office.findUnique({
        where: {
            id: officeId,
        },
        include: {
            member: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                } 
            }
        }
    });


    
    if(!office) {
        redirect("/app")
    }
    
    
    const members = office?.member.filter((member) => member.profileId !== profile.id)
    const role = office.member.find((member) => member.profileId === profile.id)?.role;

    return (
        <div className="flex-col border-l-2 h-full text-primary w-full">
            <ScrollArea className="flex-1 px-3">
                <div className="mt-2">
                    <MemeberSearch data={[
                        {
                            label: "Members",
                            type: "member",
                            data: members?.map((members) => ({
                                id: members.id,
                                name: members.profile.name,
                                icon: roleIconMap[members.role],
                            }))
                        },
                    ]}/>
                </div>
                <Separator className="my-2 rounded-md"/>
                {!!members?.length && (
                    <div className="mb-2">
                        <OfficeSection 
                            sectionType="members"
                            channelType={ChannelType.VIDEO}
                            role={role}
                            label="Members"
                            office={office}
                        />
                        {members.map((member) => (
                            <OfficeMember member={member} office={office} />
                        ))}
                    </div>  
                )}
            </ScrollArea>
        </div>
    )
}