import { PlayIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { playTrack } from '../firebase/getPlayer';

const CardLarge = ({ track }) => {
  return (
      <div className="component items-center rounded-lg bg-background-light p-3  pb-0 shadow-md transition-all hover:scale-105 hover:shadow-2xl">
          <div className="relative">
              <img src={track?.image} className="rounded-md object-cover" />

              <div
                  onClick={() => playTrack(track)}
                  className="component-play absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-pointer rounded-full bg-gradient-to-br from-primary to-secondary p-2 opacity-0 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                  <PlayIcon className="h-8 w-8 text-white" />
              </div>
          </div>
          <div className="py-2 text-center">
              <div className="text-base font-semibold">{track?.name}</div>
              <div className="text-sm font-light text-grey-light">
                  {track?.artists[0].name}
              </div>
          </div>
      </div>
  );
};

export default CardLarge;
