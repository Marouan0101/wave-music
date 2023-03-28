import { PlayIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { playTrack } from '../firebase/getPlayer';
import { RxDotsHorizontal } from 'react-icons/rx';

const CardSmall = ({ track }) => {
  return (
    <div className='component flex h-14 items-center overflow-hidden rounded-md bg-background-light shadow-md transition-all hover:scale-105 hover:shadow-2xl'>
      <div className='relative'>
        <img src={track.image} className='h-14 w-14 object-cover' />

        <div
          onClick={() => playTrack(track)}
          className='component-play absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-pointer rounded-full bg-gradient-to-br from-primary to-secondary p-2 opacity-0 shadow-lg transition-all hover:scale-105 hover:shadow-xl'
        >
          <PlayIcon className='h-4 w-4 text-white' />
        </div>
      </div>

      <div className='flex flex-1 items-center justify-between px-1'>
        <div className='space-y-1'>
          <div className='text-sm font-semibold'>{track.name}</div>
          <div className='text-sm font-light text-grey-light'>
            {track.artists[0].name}
          </div>
        </div>
        <RxDotsHorizontal className='h-5 w-5 cursor-pointer text-grey-light transition-all hover:scale-105 hover:text-white' />
      </div>
    </div>
  );
};

export default CardSmall;
