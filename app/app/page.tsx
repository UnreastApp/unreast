import { initialProfile } from "@/lib/initial.profile";

const OfficeIdPage = async () => {

    //! DONT REMOVE THIS LINE
    const profile = await initialProfile();

    return ( 
        <div className="h-screen flex flex-col justify-center items-center">
            <h1>Welcome to Unreast</h1>
        </div>
     );
}
 
export default OfficeIdPage;