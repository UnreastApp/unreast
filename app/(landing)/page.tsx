"use client";

import { Button } from "@/components/ui/button";
import { Download, LogIn } from "lucide-react";
import {  useRouter } from "next/navigation";



const LandingPage = () => {

    const router = useRouter();
    
    const onClickLogin = () => {
        return router.push("/app");
    }
    
    return (
        <div>
            <div className="flex font-medium items-center justify-between pl-20 w-full h-16 fixed">
                <a href="" className="">Unreast</a>
                <div className="flex text-sm space-x-12">
                    <a href="" className="hover:underline">Download</a>
                    <a href="" className="hover:underline">Safty</a>
                    <a href="" className="hover:underline">Support</a>
                    <a href="" className="hover:underline">Blog</a>
                    <a href="" className="hover:underline">Careers</a>
                </div>
                <div className="mr-20">
                    <Button onClick={onClickLogin}><LogIn className="w-4 h-4 mr-2"/> Login</Button>
                </div>
            </div>
            <div className="h-screen flex items-center">
                <div className="p-20">
                    <h1 className="text-5xl font-bold">Welcome to Unreast</h1>
                    <p className="mt-4">An online platform designed to facilitate global <br />collaboration by creating multiple virtual offices.</p>
                    <div className="mt-10">
                        <Button className="w-40"><Download className="w-4 h-4 mr-2"/> Download</Button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default LandingPage;