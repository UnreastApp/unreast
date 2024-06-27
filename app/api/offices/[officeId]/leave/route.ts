import { currentProfile } from "@/lib/current-profile";
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

        const office = await db.office.update({
            where: {
                id: params.officeId,
                member: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            data: {
                member: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            }
        });

        return NextResponse.json(office);

    } catch (error) {
        console.log("[OFFICE_ID_LEAVE]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}