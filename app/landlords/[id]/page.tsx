import Image from "next/image";

import ContactButton from "@/app/components/ContactButton";
import PropertyList from "@/app/components/properties/PropertyList";

const LandlordDetailPage = () => {
    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <aside className="mb-4 col-span-1">
                    <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
                        <Image 
                            src="/profile_pic_1.jpg" 
                            alt="profile-pic" 
                            className="rounded-full" 
                            width={200}
                            height={200}
                        />

                        <h1 className="mt-6 text-xl">Landlord Name</h1>

                        <ContactButton />
                    </div>
                </aside>

                <div className="pl-0 md:pl-6 col-span-1 md:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        <PropertyList />
                    </div>
                </div>
            </div>
        </main>
    )
};

export default LandlordDetailPage;
