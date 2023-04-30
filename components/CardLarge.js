import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { addTrackToQueue, playTrack } from '../firebase/getPlayer';
import { deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/auth';
import deleteTrackById from '../firebase/deleteTrackById';

const CardLarge = ({ track }) => {
    const [user, loading] = useAuthState(auth);
    const [states, setStates] = useState();
    const [queue, setQueue] = useState();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // update the state every time the state document changes
        onSnapshot(doc(db, 'player', 'states'), (snapshot) => {
            setStates(snapshot.data());
        });

        // update the 'queue' state every time the queue document changes
        onSnapshot(doc(db, 'player', 'queue'), (snapshot) => {
            setQueue(snapshot.data());
        });
    }, [user]);

    const handleOptionsMenu = (event) => {
        event.preventDefault();
        setIsMenuOpen(true); // Show the menu
        setMenuPosition({ x: event.clientX, y: event.clientY });
    };

    const handlePlay = async () => {
        if (queue.currentTrack.id !== track.id) {
            playTrack(track);
        }

        await updateDoc(doc(db, 'player/states'), {
            isPlaying: true,
        });
    };

    const handlePause = async () => {
        await updateDoc(doc(db, 'player/states'), {
            isPlaying: false,
        });
    };

    return (
        <>
            {isMenuOpen && (
                <div
                    className='fixed inset-0 z-40'
                    onClick={() => setIsMenuOpen(false)}
                >
                    <div
                        className='absolute z-50 w-40 space-y-2 rounded-xl bg-background-light p-4 text-right shadow-lg'
                        style={{
                            top: menuPosition.y,
                            left: menuPosition.x,
                        }}
                    >
                        <div>
                            <div
                                onClick={() => addTrackToQueue(track)}
                                className='mb-2 cursor-pointer text-sm'
                            >
                                Add to queue
                            </div>
                            <hr className='w-full border-grey-dark' />
                            <div className='mt-2 mb-2 cursor-default text-sm'>
                                Add to playlist
                            </div>
                            <hr className='w-full border-grey-dark' />
                            <div
                                onClick={() => deleteTrackById(track.id)}
                                className='mt-2 cursor-default text-sm'
                            >
                                Delete track
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div
                onContextMenu={(event) => handleOptionsMenu(event)}
                className='component items-center rounded-lg bg-background-light p-3  pb-0 shadow-md transition-all hover:scale-105 hover:shadow-2xl'
            >
                <div className='relative'>
                    <img
                        src={track?.image}
                        className='h-40 w-full rounded-md object-cover'
                    />

                    {states &&
                    states.isPlaying &&
                    queue.currentTrack.id === track.id ? (
                        <div
                            onClick={handlePause}
                            className='component-play absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-pointer rounded-full bg-gradient-to-br from-primary to-secondary p-2 opacity-0 shadow-lg transition-all hover:scale-105 hover:shadow-xl'
                        >
                            <PauseIcon className='h-8 w-8 text-white' />
                        </div>
                    ) : (
                        <div
                            onClick={handlePlay}
                            className='component-play absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-pointer rounded-full bg-gradient-to-br from-primary to-secondary p-2 opacity-0 shadow-lg transition-all hover:scale-105 hover:shadow-xl'
                        >
                            <PlayIcon className='h-8 w-8 text-white' />
                        </div>
                    )}
                </div>
                <div className='py-2 text-center'>
                    <div className='text-base font-semibold'>{track?.name}</div>

                    <div className='flex justify-center space-x-2 font-light text-grey-light'>
                        {track?.artists.map((artist, index) => (
                            <div key={artist.uid} className='flex items-center'>
                                <span className='truncate'>{artist.name}</span>
                                {index !== track.artists.length - 1 && ', '}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardLarge;
