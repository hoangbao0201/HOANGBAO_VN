"use client";

import { useCreateMediaStream } from "@/hook/useCreateMediaStream";
import { useStartPeerSession } from "@/hook/useStartPeerSession";
import { useParams } from "next/navigation";
import { useRef } from "react";

const RoomLivePage = () => {
    const { room }: { room: string } = useParams();
    const localVideoRef = useRef<HTMLVideoElement>(null);

    const userMediaStream = useCreateMediaStream(localVideoRef);
    const {
        connectedUsers,
        shareScreen,
        cancelScreenSharing,
        isScreenShared
    } = useStartPeerSession({ room, userMediaStream, localVideoRef });

    console.log(connectedUsers);

    return (
        <main className="max-w-7xl w-full mx-auto">
            <div className="bg-white px-4 py-4 min-h-screen rounded-md shadow-sm my-3">
                <div className="font-semibold text-lg mb-4">LivePage</div>

                <div>
                    <video
                        ref={localVideoRef}
                        className="aspect-video w-full h-full"
                        autoPlay
                        playsInline
                        muted
                    />
                    {connectedUsers.map((user) => (
                        <video key={user} id={user} autoPlay playsInline />
                    ))}
                </div>

                <button
                    onClick={isScreenShared ? cancelScreenSharing : shareScreen}
                >
                    {isScreenShared ? "Stop Sharing Screen" : "Share Screen"}
                </button>
            </div>
        </main>
    );
};

export default RoomLivePage;
