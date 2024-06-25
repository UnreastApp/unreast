import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "../utils/mode-toggle";
import { UserButton } from "@clerk/nextjs";

const NavigationSideBar = async () => {

    const profile = await currentProfile();

    if(!profile) {
        redirect("/");
    }

    const offices = await db.office.findMany({
        where: {
            member: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    return ( 
        <div className="flex flex-col items-center h-full space-y-4 w-full bg-white dark:bg-card"> 
            <NavigationAction/>
            <Separator className="h-[2px] rounded-md w-10 mx-auto"/>
            <ScrollArea className="flex-1 w-full">
                {offices.map((office) => (
                    <div key={office.id} className="mb-4">
                        <NavigationItem
                            id={office.id}
                            name={office.name}
                            imageUrl={office.imageUrl}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle/>
                <UserButton afterSignOutUrl="/app" appearance={{elements: {avatarBox: "h-[48px] w-[48px] rounded-sm"}}}/>
            </div>
        </div>
     );
}
 
export default NavigationSideBar;