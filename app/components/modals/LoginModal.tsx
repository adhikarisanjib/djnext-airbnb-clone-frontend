'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

import Modal from "./Modal";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";

import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";


const LoginModal = () => {
    const loginModal = useLoginModal((state) => state);

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const submitLogin = async () => {
        const formData = {
            "email": email,
            "password": password,
        }

        const response = await apiService.postWithoutToken("/api/auth/login/", JSON.stringify(formData));

        if (response.access) {
            await handleLogin(response.user.pk, response.access, response.refresh);
            loginModal.close();
            router.push("/");
        } else {
            const tmpErrors: string[] = Object.values(response).map((error: any) => error);
            setErrors(tmpErrors);
        }
    };

    const content = (
        <>
            <h2 className="mb-6 text-2xl">Welcome to DjangoBnb, please login</h2>

            <form className="space-y-4">
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" placeholder="Password" />
                
                {errors.map((error, index) => {
                    return (
                        <div key={`error-${index}`} className="p-5 bg-airbnb text-white rounded-xl opacity-70">
                            {error}
                        </div>
                    )
                })}

                <CustomButton label="Login" onClick={submitLogin} />
            </form>
        </>
    )

    return (
        <Modal isOpen={loginModal.isOpen} close={loginModal.close} title="Login" content={content} />
    )
};

export default LoginModal;
