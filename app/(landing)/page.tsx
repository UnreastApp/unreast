import { Button } from "@/components/ui/button";


const LandingPage = async () => {

    return (
        <div className="h-screen flex flex-col p-40 items-center">
            <div className="flex justify-center items-center flex-col">
                <h1 className="text-3xl text-center font-bold">Comming Soon</h1>
                <p className="text-center text-base w-64 mt-5">Welcome to Unreast, an alternative to discord and slack</p>
                <Button className="mt-5">Early Access</Button>
            </div>
        </div>
    );
}

export default LandingPage;