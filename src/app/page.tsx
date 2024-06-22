"use client"
import LayoutAdmin from "@/components/LayoutAdmin";
import {Notification} from "@/components/Notification";
import {ArrowRight, Check, Rocket, X} from "lucide-react";
import {AInput} from "@/components/AInput/AInput";

export default function Home() {
    return (
        <LayoutAdmin>
            <main className="min-h-screen flex flex-col justify-center items-center">
                <div className="w-[400px] pb-4">
                    <AInput placeholder="Digite algo" iconLeft={Rocket} iconRight={Check}/>
                </div>
                <div className="w-[448px] rounded overflow-hidden">
                    {/* HEADER */}
                    <div className="bg-zinc-200 dark:bg-zinc-800 px-8 py-4 flex items-center justify-between">
                        <span className="font-bold">Notificações</span>
                        <button className="text-violet-500 hover:text-violet-400 font-bold text-xs">
                            MARCAR TODAS COMO VISTAS
                        </button>
                    </div>

                    {/* Recent Section */}
                    <div>
                        <div
                            className="bg-zinc-300 font-medium dark:bg-zinc-950 px-5 py-2 text-sm text-zinc-500 dark:text-zinc-400">
                            Recentes
                        </div>
                        <div className="divide-y-2 divide-zinc-300 dark:divide-zinc-950">
                            <Notification.Root>
                                <Notification.Icon icon={Rocket}/>
                                <Notification.Content text="Você foi convidado para um evento"/>
                                <Notification.Actions>
                                    <Notification.Action icon={X} onClick={() => console.log("Aceitar")}/>
                                    <Notification.Action icon={Rocket} onClick={() => console.log("Recusar")} className="bg-violet-500 hover:bg-violet-600"/>
                                </Notification.Actions>
                            </Notification.Root>
                            <Notification.Root>
                                <Notification.Icon icon={Rocket}/>
                                <Notification.Content text="Você foi convidado para um evento"/>
                                <Notification.Actions>
                                    <Notification.Action icon={ArrowRight} onClick={() => console.log("Recusar")} className="bg-emerald-500 hover:bg-emerald-600"/>
                                </Notification.Actions>
                            </Notification.Root>
                        </div>
                    </div>

                    {/* Old Section */}
                    <div>
                        <div
                            className="bg-zinc-300 font-medium dark:bg-zinc-950 px-5 py-2 text-sm text-zinc-500 dark:text-zinc-400">
                            Antigas
                        </div>
                        <div className="divide-y-2 divide-zinc-300 dark:divide-zinc-950">
                            <Notification.Root>
                                <Notification.Icon icon={Rocket}/>
                                <Notification.Content text="Você foi convidado para um evento"/>
                                <Notification.Actions>
                                    <Notification.Action icon={X} onClick={() => console.log("Aceitar")} className="bg-red-400"/>
                                    <Notification.Action icon={Check} onClick={() => console.log("Recusar")} className="bg-orange-400"/>
                                </Notification.Actions>
                            </Notification.Root>
                            <Notification.Root>
                                <Notification.Icon icon={Rocket}/>
                                <Notification.Content text="Você foi convidado para um evento"/>
                                <Notification.Actions>
                                    <Notification.Action icon={X} onClick={() => console.log("Aceitar")}/>
                                    <Notification.Action icon={Rocket} onClick={() => console.log("Recusar")}/>
                                </Notification.Actions>
                            </Notification.Root>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>

    );
}
