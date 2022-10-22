import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "react-feather";
import { AudioRecorder } from "jnaudiostream";

export default function MicrophoneButton({ socket }) {
    const [recording, setRecording] = useState(false);

    const recorderRef = useRef(new AudioRecorder({}, 100)); // 1ms

    useEffect(() => {
        if (!socket) return;
        const recorder = recorderRef.current;

        recorder.onReady = (packet) => {
            console.log("Recording started!");
            console.log(packet);
            console.log("Header size: " + packet.data.size + "bytes");
            socket.emit("bufferHeader", packet);
        };

        recorder.onBuffer = (packet) => {
            socket.emit("stream", packet);
        };
    }, [socket]);

    const onClickMic = () => {
        const recorder = recorderRef.current;
        setRecording(!recorder.recording);
        recorder.recording
            ? recorder.stopRecording()
            : recorder.startRecording();
    };

    const Icon = recording ? MicOff : Mic;

    const title = `${recording ? "Stop" : "Start"} recording`;

    return (
        <div className="flex flex-col items-center w-full">
            <button
                type="button"
                title={title}
                onClick={onClickMic}
                className="rounded-full p-5 bg-transparent border-2 border-blue-300 focus:border-red-600 hover:bg-gray-700"
            >
                <Icon size={64} className="color-white" />
            </button>
        </div>
    );
}
