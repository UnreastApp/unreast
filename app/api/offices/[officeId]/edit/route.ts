import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req:Request, {params}: {params: {officeId: string}}) {
    try {

        const profile = await currentProfile();
        const {name, imageUrl} = await req.json();

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const office = await db.office.update({
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
                name,
                imageUrl,
            }
        });

        return NextResponse.json(office);

    } catch (error) {
        console.log("[OFFICE_ID_PATCH]" ,error);
        return new NextResponse("Internal Error", {status: 500})
    }
} 