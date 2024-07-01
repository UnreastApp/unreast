import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req:Request, {params}: {params: {channelId: string}}) {
    try {
        const profile = await currentProfile();
        const {name, type} = await req.json();
        const { searchParams } = new URL(req.url);

        const officeId = searchParams.get("officeId");

        if(!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (!officeId) {
            return new NextResponse("Office ID missing", {status: 400});
        }

        if (!params.channelId) {
            return new NextResponse("Officel ID missing", {status: 400});
        }


        const office = await db.office.update({
            where: {
                id: officeId,
                member: {
                    some: {
                        OR: [
                            {role: "ADMIN"},
                            {role: "MODERATOR"}
                        ]
                    }
                }
            },
            data: {
                channel: {
                    update: {
                        where: {
                            id: params.channelId,
                        },
                        data: {
                            name,
                            type,
                        }
                    }
                }
            }
        });

        return await NextResponse.json(office)

    } catch (error) {
        console.log("[CHANNEL_ID_PATCH]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}