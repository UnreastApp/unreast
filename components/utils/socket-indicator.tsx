"use client";

import { useSocket } from "@/components/providers/socket-provider"
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";

const SocketIndication = () => {
    const { isConnected } = useSocket();

    if (!isConnected) {
        return (
            <div>
                <Circle className="text-yellow-500" />
            </div>
        )
    }

    return (
        <div>
            <Circle className="text-green-500" />
        </div>
    )


}

export default SocketIndication;