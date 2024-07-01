"use client"

import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "imageUploader"
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {

    const fileType = value?.split(".").pop();

    if (value && fileType !== "pdf") {
        return (
            <div className="relative">
                <Image
                    src={value}
                    alt="upload"
                    className="rounded-2xl"
                    width="120"
                    height="120"
                />
                <button 
                    onClick={() => onChange("")} 
                    className="bg-destructive text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button"
                    >
                    <X className="h-4 w-4"/>
                </button>
            </div>
        )
    }

    if (value && fileType === "pdf") {
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-border">
                <FileIcon className="h-10 w-10 text-primary"/>
                <a href={value} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-primary">
                    {value}
                </a>
                <button 
                    onClick={() => onChange("")} 
                    className="bg-destructive text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                    type="button"
                    >
                    <X className="h-4 w-4"/>
                </button>
            </div>
        )
    }


    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log(error)
            }}
        />
    )
}