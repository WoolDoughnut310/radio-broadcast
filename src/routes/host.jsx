import { useRef } from "react";
import MicrophoneButton from "../components/MicrophoneButton";
import MusicControls from "../components/MusicControls";
import { io } from "socket.io-client";
import { Radio } from "react-feather";

const URL = "http://localhost:3000";

function Host() {
    const socketRef = useRef(io(URL));

    return (
        <div className="flex flex-col items-center h-full">
            <h1 className="text-5xl font-bold">Broadcast</h1>
            <Radio size={48} className="mb-4" />
            <MicrophoneButton socket={socketRef.current} />
            <MusicControls socket={socketRef.current} />
        </div>
    );
}

export default Host;
