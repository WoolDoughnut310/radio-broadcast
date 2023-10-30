import { AudioStreamer } from "jnaudiostream";
import { useEffect, useRef, useState } from "react";

const useAudioStreamer = (socket, canStart, bufferHeader) => {
    const streamerRef = useRef();
    const [streamerHeader, setStreamerHeader] = useState();

    const updateStreamerHeader = () => {
        const streamer = streamerRef.current;
        if (!streamerHeader || !streamer || streamer.mediaBuffer) return;

        streamer.setBufferHeader(streamerHeader);
        streamer.playStream();
    };

    useEffect(() => {
        if (!canStart) return;

        streamerRef.current = new AudioStreamer();
        const streamer = streamerRef.current;

        socket.on("bufferHeader", setStreamerHeader)

        socket.on("stream", (packet) => {
            if (!streamer.mediaBuffer) {
                return;
            }
            streamer.receiveBuffer(packet);
        });

        updateStreamerHeader()

        return () => {
            socket.off("bufferHeader");
            socket.off("stream");
        };
    }, [canStart]);

    useEffect(() => {
        updateStreamerHeader()
    }, [streamerHeader]);

    useEffect(() => {
        if (!bufferHeader) return;
        setStreamerHeader(bufferHeader);
    }, [bufferHeader]);
};

export default useAudioStreamer;
