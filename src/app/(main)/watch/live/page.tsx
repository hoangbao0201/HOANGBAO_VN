"use client"

import LiveScreen from "@/components/modules/Watch/Live";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LivePage = () => {
    const router = useRouter();
    const [room, setRoom] = useState<string>("");

    const handleJoinRoom = () => {
        router.push(`/watch/live/${room}`);
    }

    return (
        <main className="max-w-7xl w-full mx-auto">
            <div className="bg-white px-4 py-4 min-h-screen rounded-md shadow-sm my-3">
                <div className="font-semibold text-lg mb-4">LivePage</div>
                {/* <div className="border bg-gray-300 rounded-md min-h-[500px]">
                    <LiveScreen />
                </div> */}

                <input value={room} onChange={(e) => setRoom(e.target.value)} className="border py-2 px-3 rounded-md outline-none mr-3"/>
                <button onClick={handleJoinRoom} className="text-white bg-blue-500 rounded-md py-2 px-3">Vào nhóm</button>
            </div>
        </main>
    )
}

export default LivePage;