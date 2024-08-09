'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import useSignupModal from "@/app/hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";

import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";


const SignupModal = () => {
    const signupModal = useSignupModal((state) => state);

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const submitSignup = async () => {
        const formData = {
            "email": email,
            "password1": password,
            "password2": repeatPassword,
        }
        console.log(formData);

        const response = await apiService.postWithoutToken("/api/auth/register/", JSON.stringify(formData));

        if (response.access) {
            handleLogin(response.user.pk, response.access, response.refresh);
            signupModal.close();
            router.push("/");
        } else {
            const tmpErrors: string[] = Object.values(response).map((error: any) => error);
            setErrors(tmpErrors);
        }
    };

    const content = (
        <>
            <h2 className="mb-6 text-2xl">Welcome to DjangoBnb, Register here</h2>

            <form className="space-y-4">
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" placeholder="Password" />
                <input onChange={(e) => setRepeatPassword(e.target.value)} type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" placeholder="Repeat Password" />
                
                {errors.map((error, index) => {
                    return (
                        <div key={`error-${index}`} className="p-5 bg-airbnb text-white rounded-xl opacity-70">
                            {error}
                        </div>
                    )
                })}
                
                <CustomButton label="Signup" onClick={submitSignup} />
            </form>
        </>
    )

    return (
        <Modal isOpen={signupModal.isOpen} close={signupModal.close} title="Register" content={content} />
    )
};

export default SignupModal;
