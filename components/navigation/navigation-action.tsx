"use client"

import { Home, Plus } from "lucide-react";
import { ActionTooltip } from "@/components/utils/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";

export const NavigationAction = () => {

    const router = useRouter();
    const { onOpen } = useModal();

    const redirectApp = () => {
        router.push("/app"),
        onOpen("createOffice")
    };

    const returnHome = () => {
        router.push("/app")
    };

    return (
        <div>
            <ActionTooltip side="right" align="center" label="Home">
                <button onClick={returnHome} className="group bg mt-3 flex items-center">
                    <div className="flex mx-3 h-[48px] w-[48px] rounded-md overflow-hidden items-center justify-center
                     group-hover:bg-primary">
                        <Home className="text-primary group-hover:text-white transition-all" />
                    </div>
                </button>
            </ActionTooltip>
            <ActionTooltip side="right" align="center" label="Create Office">
                <button onClick={redirectApp} className="group mt-3 flex items-center">
                    <div className="flex mx-3 h-[48px] w-[48px] rounded-md overflow-hidden items-center justify-center
                    bg-background group-hover:bg-primary">
                        <Plus className="text-primary group-hover:text-white transition-all" />
                    </div>
                </button>
            </ActionTooltip>
        </div >
    );
}
