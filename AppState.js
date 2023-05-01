import { createContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/auth';

//export const AudioContext = createContext();
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, isUserLoading] = useAuthState(auth);
    const [audioFile, setAudioFile] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isTrackModified, setIsTrackModified] = useState(false);

    return (
        <AppContext.Provider
            value={{
                user,
                isUserLoading,
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
