import { Hash, Mic, ShieldAlert, ShieldCheck, User, Video } from "lucide-react";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { OfficeHeader } from "./office-header";
import { ChannelsSearch } from "./office-search";
import { OfficeSection } from "./office-section";
import { OfficeChannel } from "./office-channel";

interface OfficeSidebarProps {
    officeId: string;
}

const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4"/>,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4"/>,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4"/>

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
    const audioChannels = office?.channel.filter((channel) => channel.type === ChannelType.AUDIO)
    const videoChannels = office?.channel.filter((channel) => channel.type === ChannelType.VIDEO)

    if(!office) {
        redirect("/app")
    }

    const role = office.member.find((member) => member.profileId === profile.id)?.role;


    return (
        <div className="flex flex-col border-r-2 h-full text-primary w-full">
            <OfficeHeader office={office} role={role}/>
            <ScrollArea className="flex-1 px-3">
                <div className="mt-2">
                    <ChannelsSearch data={[
                        {
                            label: "Text Channels",
                            type: "channel",
                            data: textChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type],
                                avatar: {},
                            }))
                        },
                        {
                            label: "Voice Channels",
                            type: "channel",
                            data: audioChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type],
                            }))
                        },
                        {
                            label: "Video Channels",
                            type: "channel",
                            data: videoChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type],
                            }))
                        }
                    ]}/>
                </div>
                <Separator className="my-2 rounded-md"/>
                {textChannels?.length && (
                    <div className="mb-2">
                        <OfficeSection 
                            sectionType="channels"
                            channelType={ChannelType.TEXT}
                            role={role}
                            label="Text Channels"
                        />
                        {textChannels.map((channel) => (
                            <OfficeChannel key={channel.id} channel={channel} office={office} role={role}/>
                        ))}
                    </div>  
                )}
                {!!audioChannels?.length && (
                    <div className="mb-2">
                        <OfficeSection 
                            sectionType="channels"
                            channelType={ChannelType.AUDIO}
                            role={role}
                            label="Voice Channels"
                        />
                        {audioChannels.map((channel) => (
                            <OfficeChannel key={channel.id} channel={channel} office={office} role={role}/>
                        ))}
                    </div>  
                )}
                {!!videoChannels?.length && (
                    <div className="mb-2">
                        <OfficeSection 
                            sectionType="channels"
                            channelType={ChannelType.VIDEO}
                            role={role}
                            label="Video Channels"
                        />
                        {videoChannels.map((channel) => (
                            <OfficeChannel key={channel.id} channel={channel} office={office} role={role}/>
                        ))}
                    </div>  
                )}
            </ScrollArea>
        </div>
    )
}