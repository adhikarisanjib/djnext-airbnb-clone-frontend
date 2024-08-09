'use server'

import { set } from "date-fns";
import { cookies } from "next/headers"


export async function handleRefresh () {
    console.log("handle refresh token")

    const refreshToken = await getRefreshToken();
    const token = fetch(`http://localhost:8000/api/auth/token/refresh/`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
    })
    .then((response) => response.json())
    .then((json) => {
        console.log("Refresh token", json)

        if (json.access) {
            cookies().set("session_accessToken", json.access, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60,
                path: "/",
            });

            return json.access;
        } else {
            resetAuthCookies();
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        resetAuthCookies();
    });

    return token;
}


export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    cookies().set("session_userId", userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });

    cookies().set("session_accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        path: "/",
    });

    cookies().set("session_refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });
}


export async function resetAuthCookies() {
    cookies().set("session_userId", "")
    cookies().set("session_accessToken", "")
    cookies().set("session_refreshToken", "")
}


export async function getUserId() {
    const userId =  cookies().get("session_userId")?.value;
    return userId ? userId : null;
}


export async function getAccessToken() {
    const accessToken = cookies().get("session_accessToken")?.value;

    if (!accessToken) {
        const token = await handleRefresh();
        return token;
    }

    return accessToken ? accessToken : null;
}


export async function getRefreshToken() {
    const refreshToken = cookies().get("session_refreshToken")?.value;
    return refreshToken ? refreshToken : null;
}
