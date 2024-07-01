"use client";

import { useEffect, useState } from "react";

import { CreateOfficeModal } from "@/components/modals/create-office-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditOfficeModal } from "@/components/modals/edit-office-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { CreateChannelModal } from "@/components/modals/create-channel-model";
import { LeaveOfficeModal } from "@/components/modals/leave-office-modal";
import { DeleteOfficeModal } from "@/components/modals/delete-office-modal";
import { DeleteChannelModal } from "@/components/modals/delete-channel-modal";
import { EditChannelModal } from "@/components/modals/edit-channel-model";
import { MessageFileModal } from "@/components/modals/message-file-modal";
import { DeleteMessageModal } from "@/components/modals/delete-message-modal";

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
            <DeleteChannelModal/>
            <EditChannelModal/>
            <MessageFileModal/>
            <DeleteMessageModal/>
        </>
    )
}