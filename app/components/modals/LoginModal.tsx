'use client';

import Modal from "./Modal";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";

const LoginModal = () => {
    const loginModal = useLoginModal((state) => state);

    const content = (
        <>
            <h2 className="mb-6 text-2xl">Welcome to DjangoBnb, please login</h2>

            <form className="space-y-4">
                <input type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" placeholder="Email" />
                <input type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" placeholder="Password" />
                <div className="p-5 bg-airbnb text-white rounded-xl opacity-70">
                    Error messages
                </div>
                <CustomButton label="Login" onClick={() => console.log("Login")} />
            </form>
        </>
    )

    return (
        <Modal isOpen={loginModal.isOpen} close={loginModal.close} title="Login" content={content} />
    )
};

export default LoginModal;
