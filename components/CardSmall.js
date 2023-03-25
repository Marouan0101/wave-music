import { PlayIcon } from '@heroicons/react/24/solid';
import React from 'react';

const CardSmall = ({ track }) => {
  const audio = new Audio(track.source);

  return (
    <div className='component flex h-12 w-[12.75rem] items-center space-x-1 rounded-md bg-background-light shadow-md transition-all hover:scale-105 hover:shadow-2xl'>
      <div className='relative'>
        <img src={track.image} className='h-12 w-12 rounded-sm object-cover' />

        <div
          onClick={() => audio.play()}
          className='component-play absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-pointer rounded-full bg-gradient-to-br from-primary to-secondary p-2 opacity-0 shadow-lg transition-all hover:scale-105 hover:shadow-xl'
        >
          <PlayIcon className='h-4 w-4 text-white' />
        </div>
      </div>
      <div>
        <div className='text-sm font-medium'>{track.name}</div>
        <div className='text-sm font-light text-grey-light'>
          {track.artists[0].name}
        </div>
      </div>
    </div>
  );
};

export default CardSmall;
