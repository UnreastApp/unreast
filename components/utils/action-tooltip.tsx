"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActionTooltipProops {
    label: string;
    children: React.ReactNode;
    side?: "right";  
    align?: "start" | "center" | "end";
}

export const ActionTooltip = ({ label, children, side, align, }: ActionTooltipProops) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p className="font-smibold text-sm capitalize">
                        {label.toLowerCase()}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}