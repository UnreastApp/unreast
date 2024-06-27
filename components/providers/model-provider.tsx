"use client";

import { useEffect, useState } from "react";

import { CreateOfficeModal } from "@/components/modals/create-office-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditOfficeModal } from "@/components/modals/edit-office-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { CreateChannelModal } from "@/components/modals/create-channel-model";
import { LeaveOfficeModal } from "@/components/modals/leave-office-modal";
import { DeleteOfficeModal } from "../modals/delete-office-modal";

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
            <EditOfficeModal/>
            <MembersModal/>
            <CreateChannelModal/>
            <LeaveOfficeModal/>
            <DeleteOfficeModal/>
        </>
    )
}