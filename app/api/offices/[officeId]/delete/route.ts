import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req:Request, {params}: {params: {officeId: string}}) {
    try {

        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const office = await db.office.delete({
            where: {
                id: params.officeId,
                profileId: profile.id,
            }
        });

        return NextResponse.json(office);

    } catch (error) {
        console.log("[OFFICE_ID_PATCH]" ,error);
        return new NextResponse("Internal Error", {status: 500})
    }
} 