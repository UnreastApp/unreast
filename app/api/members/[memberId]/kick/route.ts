import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { memberId: string } }) {
    try{
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const officeId = searchParams.get("officeId");
        
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!officeId) {
            return new NextResponse("Office ID missing", {status: 400});
        }

        if (!params.memberId) {
            return new NextResponse("Member ID Missing", {status: 400});
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
                member: {
                    deleteMany: {
                        id: params.memberId,
                        profileId: {
                            not: profile.id
                        }
                    }
                }
            },
            include: {
                member: {
                    include:{
                        profile: true,
                    },
                    orderBy: {
                        role: "asc",
                    }
                }
            }
        });

        return NextResponse.json(office);

    } catch (error) {
        console.log("[MEMBER_ID_DELETE]" ,error)
        return new NextResponse ("Internal Error", {status: 500});
    }
}