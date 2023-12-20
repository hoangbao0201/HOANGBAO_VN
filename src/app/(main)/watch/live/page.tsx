import LiveScreen from "@/components/modules/Watch/Live";
import { useEffect, useState } from "react";

const LivePage = () => {

    return (
        <main className="max-w-7xl w-full mx-auto">
            <div className="bg-white px-4 py-4 min-h-screen rounded-md shadow-sm my-3">
                <div className="font-semibold text-lg mb-4">LivePage</div>
                <div className="border bg-gray-300 rounded-md min-h-[500px]">
                    <LiveScreen />
                </div>
            </div>
        </main>
    )
}

export default LivePage;