import { OfficeMemberSidebar } from "@/components/office/office-member-sidebar";
import { OfficeSidebar } from "@/components/office/office-sidebar";
import { currentProfile } from "@/lib/current-profile";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const OfficeIdLayout = async ({children, params}: {children:React.ReactNode; params: {officeId: string};}) => {

    const profile = await currentProfile();

    if(!profile) {
        redirect("/sign-in");
    }

    const office = await db.office.findUnique({
        where: {
            id: params.officeId,
            member: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if(!office) {
        return redirect("/app");
    }


    return (
        <div className="h-full">
            <div className="hidden fixed md:flex h-full w-60 z-20 flex-col inset-y-0">
                <OfficeSidebar officeId={params.officeId}/>
            </div>
            <main className="h-full w-auto md:pl-60 md:pr-60">
                {children}
            </main>
            <div className="hidden fixed md:flex h-full w-60 z-20 flex-col inset-y-0 right-0">
                <OfficeMemberSidebar officeId={params.officeId}/>
            </div>
        </div>
    )
}

export default OfficeIdLayout;
