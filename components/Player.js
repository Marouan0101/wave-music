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
  const [user, loading] = useAuthState(auth); // get the user
  const [states, setStates] = useState(); // get the player states
  const [queue, setQueue] = useState(); // get the player queue
  const [audio, setAudio] = useState(new Audio()); // create an audio element to play the tracks
  const [progressWidth, setProgressWidth] = useState(0); // set the progress line width to 0

  // get the player states and queue every time the user changes
  useEffect(() => {
    // listen for changes in the states document
    onSnapshot(doc(db, 'player', 'states'), (snapshot) => {
      setStates(snapshot.data()); // set states to the data in the document
    });

    // listen for changes in the queue document
    onSnapshot(doc(db, 'player', 'queue'), (snapshot) => {
      setQueue(snapshot.data()); // set queue to the data in the document
    });
  }, [user]);

  // update the audio source every time the current track changes
  useEffect(() => {
    // if the queue has a current track, update the audio source
    if (queue?.currentTrack) {
      // if the audio is playing, pause it
      audio.pause();
      // update the audio source
      audio.src = queue.currentTrack.source;
      // load the audio
      audio.load();
      // play the audio
      audio.play();
    }
  }, [queue?.currentTrack]);

  // update the progress line every time the audio is playing
  useEffect(() => {
    // update the progress line every 0.1s
    const intervalId = setInterval(() => {
      // if the audio is loaded and has a duration, update the progress line
      if (audio && audio.duration) {
        // calculate the percentage of the audio that has been played
        const percentage = audio.currentTime / audio.duration;
        // set the progress line width to the percentage
        setProgressWidth(percentage * 100);
      }
    }, 0);
    return () => clearInterval(intervalId);
  }, [audio]);

  const handlePlay = async () => {
    // update the states document to set isPlaying to true
    await updateDoc(doc(db, 'player/states'), {
      isPlaying: true,
    });
  };

  const handlePause = async () => {
    // update the states document to set isPlaying to false
    await updateDoc(doc(db, 'player/states'), {
      isPlaying: false,
    });
  };

  // if the queue or the states are not loaded, display nothing
  if (!queue?.currentTrack || !states) {
    return;
  }

  // if the player is playing, play the audio, else pause it
  if (states.isPlaying) {
    audio.play();
  } else {
    audio.pause();
  }

  return (
      <div className="fixed bottom-4 left-1/2 z-50 w-11/12 -translate-x-1/2 rounded-xl bg-purple-dark shadow-xl transition-all duration-300">
          {/* ProgressLine */}
          <div
              id="progressLine"
              className="h-1 rounded-full  bg-gradient-to-r from-transparent via-primary/50 to-primary"
              style={{ width: `${progressWidth}%` }} // width is set to the percentage of the current time of the track
          ></div>

          <div className="grid grid-cols-3">
              {/* left */}
              <div className="col-span-1 flex items-center">
                  <img
                      src={queue?.currentTrack.image}
                      className="h-16 w-16 rounded-bl-xl object-cover"
                  />

                  <div className="space-y-1 px-2">
                      <div className="font-semibold">
                          {queue?.currentTrack.name}
                      </div>

                      <div className="flex space-x-1">
                          {/* loop through the current track's artists */}
                          {queue?.currentTrack.artists.map((artist, i) => {
                              // if it's the last artist:
                              if (i + 1 === queue.currentTrack.artists.length) {
                                  // return the artist's name, without a comma
                                  return (
                                      <div
                                          key={artist.uid}
                                          className="text-sm text-grey-light"
                                      >
                                          {artist.name}
                                      </div>
                                  );
                              }
                              // if it's not the last artist:
                              else {
                                  // return the artist's name, with a comma
                                  return (
                                      <div
                                          className="text-sm text-grey-light"
                                          key={artist.uid}
                                      >
                                          {artist.name},
                                      </div>
                                  );
                              }
                          })}
                      </div>
                  </div>

                  <img src={HeartIcon.src} className="ml-10 h-5 w-5" />
              </div>

              {/* Middle */}
              <div className="col-span-1 flex items-center justify-between">
                  <IoShuffleOutline className="h-7 w-7 cursor-pointer text-grey-light transition-all hover:scale-105 hover:text-white" />
                  <IoPlaySkipBack className="h-7 w-7 cursor-pointer text-grey-light transition-all hover:scale-105 hover:text-white" />

                  {/* if the player is playing: display the pause icon, else display the play icon */}
                  {states.isPlaying ? (
                      <div
                          className="cursor-pointer rounded-full bg-gradient-to-br from-primary to-secondary p-1.5 transition-all hover:scale-105 active:scale-100"
                          onClick={handlePause}
                      >
                          <PauseIcon className="h-7 w-7 text-purple-dark" />
                      </div>
                  ) : (
                      <div
                          className="cursor-pointer rounded-full bg-gradient-to-br from-primary to-secondary p-1.5 transition-all hover:scale-105 active:scale-100"
                          onClick={handlePlay}
                      >
                          <PlayIcon className="h-7 w-7 text-purple-dark" />
                      </div>
                  )}

                  <IoPlaySkipForward className="h-7 w-7 cursor-pointer text-grey-light transition-all hover:scale-105 hover:text-white" />
                  <IoRepeatOutline className="h-7 w-7 cursor-pointer text-grey-light transition-all hover:scale-105 hover:text-white" />
              </div>

              {/* Right */}
              <div className="col-span-1 flex items-center justify-end space-x-4 pr-4">
                  <Queue
                      tracks={queue.tracks}
                      currentTrack={queue.currentTrack}
                  />
                  <TrackOptions track={queue.currentTrack} />
              </div>
          </div>
      </div>
  );
};

export default Player;
