'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {Button} from "@/components/Button";

export default function Header() {
    const { status, data: session } = useSession();
    if (status !== 'authenticated') return null

    return (
        <div className="flex gap-4 justify-center p-2 flex-wrap">
            <Link href="/">Home</Link>
            <Link href="/sobre">Sobre</Link>
            <Link href="/contato">Contato</Link>
            <span className="bg-zinc-300">
                {`Olá ${session?.user?.name?.split(' ')[0]}`} {', '}
                {session?.user?.email}
            </span>
            <Button
                text="Sair"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => signOut()}
            />
        </div>
    )
}
