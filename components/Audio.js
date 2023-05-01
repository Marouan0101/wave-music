import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../AppState';

const Audio = ({ track }) => {
    const { isPlaying, setIsPlaying } = useContext(AppContext); // add isPlaying from context
    const audioElement = useRef(null);

    useEffect(() => {
        if (audioElement.current) {
            if (isPlaying) {
                audioElement.current.play();
            } else {
                audioElement.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioElement.current) {
            audioElement.current.src = track.source;
        }
    }, [track]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div onClick={handlePlayPause}>
            <audio ref={audioElement} />
        </div>
    );
};

export default Audio;
