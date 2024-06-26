import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
    params: {
        inviteCode: string;
    };
};


const InviteCodePage = async ({ params }: InviteCodePageProps) => {

    const profile = await currentProfile();

    if (!profile) {
        return redirect("/sign-in");
    }

    if (!params.inviteCode) {
        console.log("Error")
    }

    const existingOffice = await db.office.findFirst({
        where: {
            inviteCode: params.inviteCode,
            member: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (existingOffice) {
        return redirect(`/offices/${existingOffice.id}`)
    }

    const office = await db.office.update({
        where: {
            inviteCode: params.inviteCode,
        },
        data: {
            member: {
                create: [
                    {
                        profileId: profile.id,
                    }
                ]
            }
        }
    });

    if(office) {
        return redirect(`/offices/${office.id}`);
    }

    return null;
}

export default InviteCodePage;