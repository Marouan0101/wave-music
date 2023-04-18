import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { getQueue, getState } from '../firebase/getPlayer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/auth';
import { db } from '../firebase/firestore';
import HeartIcon from '../public/HeartIcon.svg';
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import {
  IoPlaySkipForward,
  IoShuffleOutline,
  IoPlaySkipBack,
  IoRepeatOutline,
} from 'react-icons/io5';
import { HiOutlineQueueList } from 'react-icons/hi2';
import { RxDotsHorizontal } from 'react-icons/rx';
import Queue from './Queue';
import TrackOptions from './TrackOptions';

const Player = () => {
  const [user, loading] = useAuthState(auth);
  const [states, setStates] = useState();
  const [queue, setQueue] = useState();
  const [audio, setAudio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

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

  useEffect(() => {
    if (queue?.currentTrack) {
      audio.pause();
      audio.src = queue.currentTrack.source;
      audio.load();
      audio.play();
    }
  }, [queue?.currentTrack]);

  const handlePlay = async () => {
    await updateDoc(doc(db, 'player/states'), {
      isPlaying: true,
    });
  };

  const handlePause = async () => {
    await updateDoc(doc(db, 'player/states'), {
      isPlaying: false,
    });
  };

  if (!queue?.currentTrack || !states) {
    return;
  }

  if (states.isPlaying) {
    audio.play();
  } else {
    audio.pause();
  }

  return (
    <div className='fixed bottom-4 left-1/2 z-50 h-16 w-11/12 -translate-x-1/2 rounded-xl bg-purple-dark shadow-xl transition-all duration-300'>
      {/* Progressbar */}
      <div></div>

      <div className='grid grid-cols-3'>
        {/* left */}
        <div className='col-span-1 flex items-center'>
          <img
            src={queue?.currentTrack.image}
            className='h-16 w-16 rounded-l-xl  object-cover'
          />

          <div className='space-y-1 px-2'>
            <div className='font-semibold'>{queue?.currentTrack.name}</div>

            <div className='flex space-x-1'>
              {queue?.currentTrack.artists.map((artist, i) => {
                if (i + 1 === queue.currentTrack.artists.length) {
                  return (
                    <div key={artist.uid} className='text-sm text-grey-light'>
                      {artist.name}
                    </div>
                  );
                } else
                  return (
                    <div className='text-sm text-grey-light' key={artist.uid}>
                      {artist.name},
                    </div>
                  );
              })}
            </div>
          </div>

          <img src={HeartIcon.src} className='ml-10 h-5 w-5' />
        </div>

        {/* Middle */}
        <div className='col-span-1 flex items-center justify-between'>
          <IoShuffleOutline className='h-7 w-7 cursor-pointer text-grey-light transition-all hover:scale-105 hover:text-white' />
          <IoPlaySkipBack className='h-7 w-7 cursor-pointer text-grey-light transition-all hover:scale-105 hover:text-white' />

          {states.isPlaying ? (
            <div
              className='cursor-pointer rounded-full bg-gradient-to-br from-primary to-secondary p-1.5 transition-all hover:scale-105 active:scale-100'
              onClick={handlePause}
            >
              <PauseIcon className='h-7 w-7 text-purple-dark' />
            </div>
          ) : (
            <div
              className='cursor-pointer rounded-full bg-gradient-to-br from-primary to-secondary p-1.5 transition-all hover:scale-105 active:scale-100'
              onClick={handlePlay}
            >
              <PlayIcon className='h-7 w-7 text-purple-dark' />
            </div>
          )}
          <IoPlaySkipForward className='h-7 w-7 cursor-pointer text-grey-light transition-all hover:scale-105 hover:text-white' />

          <IoRepeatOutline className='h-7 w-7 cursor-pointer text-grey-light transition-all hover:scale-105 hover:text-white' />
        </div>

        {/* Right */}
        <div className='col-span-1 flex items-center justify-end space-x-4 pr-4'>
          <Queue tracks={queue.tracks} currentTrack={queue.currentTrack} />
          <TrackOptions track={queue.currentTrack} />
        </div>
      </div>
    </div>
  );
};

export default Player;
