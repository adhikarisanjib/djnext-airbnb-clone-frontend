'use client'

import { useRouter } from "next/navigation"

import MenuLink from "./navbar/MenuLink"
import { resetAuthCookies } from "../lib/actions";


const LogoutButton: React.FC = () => {
    const router = useRouter()

    const handleLogout = async () => {
        await resetAuthCookies();
        router.push("/");
    }

    return (
        <MenuLink label="Logout" onClick={handleLogout} />
    )
};

export default LogoutButton;
