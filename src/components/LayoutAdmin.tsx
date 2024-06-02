'use client'
import React from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function LayoutAdmin({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    const {data: session, status} = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <div className="min-h-screen flex justify-center pt-52">Loading...</div>;
    }

    if (!session) {
        setTimeout(() => {
            router.replace("/login");
        }, 100)
        return null
    }

    return <div className="min-h-screen bg-gray-100">{children}</div>

}
