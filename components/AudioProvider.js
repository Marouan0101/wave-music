import { useState } from "react";
import { AudioContext } from "../audioContext";

const AudioProvider = ({ children }) => {
    const [audioFile, setAudioFile] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);


    return (
        <AudioContext.Provider value={{ audioFile, setAudioFile, isPlaying, setIsPlaying }}>
            {children}
        </AudioContext.Provider>
    );
};

export default AudioProvider;
