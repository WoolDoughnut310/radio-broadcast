import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useAudioStreamer from "../hooks/useAudioStreamer";
import { Headphones } from "react-feather";

const URL = "http://localhost:3000";

function Listen() {
    const socketRef = useRef(io(URL));
    const [canPlay, setCanPlay] = useState(false);
    const [bufferHeader, setBufferHeader] = useState();
    const audioEl = useRef();
    useAudioStreamer(socketRef.current, canPlay, bufferHeader);

    useEffect(() => {
        if (!canPlay || audioEl.current === undefined) return;
        audioEl.current.play();
    }, [canPlay]);

    useEffect(() => {
        socketRef.current.on("bufferHeader", (packet) => {
            setBufferHeader(packet);
        })
    }, []);

    return (
        <div className="flex flex-col items-center h-full">
            <h1 className="text-5xl font-bold">
                {!canPlay ? "Click to Listen" : "Listening..."}
            </h1>
            <button onClick={() => setCanPlay(true)} className="rounded-full bg-gray-700 enabled:hover:bg-gray-600 transition-all p-6 mt-5" disabled={canPlay}>
                <Headphones size={50} />
            </button>
            <audio src={`${URL}/stream`} ref={audioEl} />
        </div>
    );
}

export default Listen;
