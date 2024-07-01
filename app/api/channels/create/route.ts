import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const profile = await currentProfile();
        const {name , type } = await req.json();
        const { searchParams } = new URL(req.url);

        const officeId = searchParams.get("officeId");

        if(!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (!officeId) {
            return new NextResponse("Office ID missing", {status: 400});
        }

        if (name === "general") {
            return new NextResponse("Name cannot be 'general'", {status: 400});
        }

        const office = await db.office.update ({
            where: {
                id: officeId,
                member: {
                    some:{
                        OR: [
                            {role: "ADMIN"},
                            {role: "MODERATOR"}
                        ]
                    }
                }
            },
            data: {
                channel: {
                    create: {
                        profileId: profile.id,
                        name,
                        type,
                    }
                }
            }
        });
     
        return NextResponse.json(office)
        
    } catch (error) {
        console.log("[CHANNELS_POST]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}