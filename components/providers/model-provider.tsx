"use client";

import { useEffect, useState } from "react";

import { CreateOfficeModal } from "@/components/modals/create-office-modal";
import { InviteModal } from "../modals/invite-modal";

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
            <InviteModal/>
        </>
    )
}