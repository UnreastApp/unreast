import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { OfficeHeader } from "./office-header";

interface OfficeSidebarProps {
    officeId: string;
}

export const OfficeSidebar = async ({officeId}: OfficeSidebarProps) => {

    const profile = await currentProfile();

    if(!profile) {
        redirect("/")
    }

    const office = await db.office.findUnique({
        where: {
            id: officeId,
        },
        include: {
            channel: {
                orderBy: {
                    createdAt: "asc"
                },
            },
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

    const textChannels = office?.channel.filter((channel) => channel.type === ChannelType.TEXT)
    const auidoChannels = office?.channel.filter((channel) => channel.type === ChannelType.AUIDIO)
    const videohannels = office?.channel.filter((channel) => channel.type === ChannelType.VIDEO)

    const members = office?.member.filter((member) => member.profileId !== profile.id)

    if(!office) {
        redirect("/app")
    }

    const role = office.member.find((member) => member.profileId === profile.id)?.role;


    return (
        <div className="flex flex-col h-full text-primary w-full">
            <OfficeHeader office={office} role={role}/>
        </div>
    )
}