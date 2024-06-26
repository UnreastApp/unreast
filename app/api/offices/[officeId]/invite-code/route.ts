import { currentProfile } from "@/lib/current-profile";
import {v4 as uuidv4} from "uuid";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req:Request, {params}: {params: {officeId: string}}) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (!params.officeId) {
            return new NextResponse("Office ID Missing", {status: 400});
        }

        const server = await db.office.update({
            where: {
                id: params.officeId,
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
                inviteCode: uuidv4(),
            }
        });

        return NextResponse.json(server);

    } catch (error) {
        console.log("[OFFICE_ID]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}