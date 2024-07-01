import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface OfficeIdPageProps {
    params: {
        officeId: string;
    }
}

const OfficeIdPage = async ({params}: OfficeIdPageProps) => {

    const profile = await currentProfile();
    
    if(!profile) {
        return redirect("/sign-in")
    }

    const office = await db.office.findUnique({
        where: {
            id: params.officeId,
            member: {
                some: {
                    profileId: profile.id,
                }
            }
        },
        include: {
            channel: {
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    });

    const initialChannel = office?.channel[0];

    if (!initialChannel?.id) {
        return redirect("/app")
    }

    return redirect(`/offices/${params.officeId}/channels/${initialChannel?.id}`)
}
 
export default OfficeIdPage;