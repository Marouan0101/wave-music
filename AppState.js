import { createContext, useState } from 'react';

//export const AudioContext = createContext();
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [audioFile, setAudioFile] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isTrackModified, setIsTrackModified] = useState(false);

    return (
        <AppContext.Provider
            value={{
                audioFile,
                setAudioFile,
                isPlaying,
                setIsPlaying,
                isTrackModified,
                setIsTrackModified,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
