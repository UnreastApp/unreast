"use client";

import { useSocket } from "@/components/providers/socket-provider"
import { Badge } from "@/components/ui/badge";

const SocketIndication = () => {
    const { isConnected } = useSocket();

    if (!isConnected) {
        return (
            <Badge variant="outline" className="bg-yellow-600 font-medium text-card border-none">
                Fallback: Polling every 1s
            </Badge>
        )
    }

    return (
        <Badge variant="outline" className="bg-emerald-600 font-medium text-card border-none">
            Live: Real-Time updates
        </Badge>
    )


}

export default SocketIndication;