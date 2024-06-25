
import { currentProfile } from "@/lib/current-profile";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";


export async function POST(req: Request) {
    try{
        const {name, imageUrl} = await req.json();
        const profile = await currentProfile();

        if(!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        
        const office = await db.office.create({
            data: {
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: uuidv4(),
                channel: {
                    create: [
                        {name: "general", profileId: profile.id}
                    ]
                },
                member: {
                    create: [
                        {profileId: profile.id, role: MemberRole.ADMIN}
                    ]
                }
            }
        });

        return NextResponse.json(office);

    } catch (error) {
        console.log("[OFFICES_POST]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}