"use client";

import { CreateOfficeModal } from "@/components/modals/create-office-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

    }, []);

    if (!isMounted) {
        return null;
    }

    return(
        <>
            <CreateOfficeModal/>
        </>
    )
}