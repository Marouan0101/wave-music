import React, { useState } from 'react';
import { HiOutlineQueueList } from 'react-icons/hi2';
import { IoIosRemoveCircleOutline } from 'react-icons/io';

const Queue = ({ tracks, currentTrack }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <div className=''>
        <HiOutlineQueueList
          onClick={() => setIsOpen(!isOpen)}
          className='h-6 w-6 cursor-pointer text-primary transition-all hover:scale-105 '
        />
        <div className='absolute bottom-20 right-0 w-72 rounded-xl bg-black p-4 shadow-xl'>
          <div className='text-center text-sm font-semibold text-primary'>
            {currentTrack.name}
          </div>
          <hr className='my-2 w-full border border-grey-dark' />

          {tracks ? (
            tracks.map((track, i) => {
              return (
                <div key={track.id}>
                  <div className='component relative flex items-center space-x-4'>
                    <div className='text-xs text-grey-light'>{i + 1}</div>
                    <div className='flex space-x-4'>
                      <div className='text-sm font-semibold'>{track.name}</div>
                      <div className='flex items-center space-x-1 text-xs text-grey-light'>
                        {track.artists.map((artist, i) => {
                          if (i + 1 === track.artists.length) {
                            return <div key={artist.uid}>{artist.name}</div>;
                          } else {
                            return <div key={artist.uid}>{artist.name},</div>;
                          }
                        })}
                      </div>
                    </div>

                    <IoIosRemoveCircleOutline className='component-play absolute right-0 h-4 w-4 cursor-pointer text-red-600 opacity-0 transition-all' />
                  </div>

                  {i + 1 !== tracks.length && (
                    <hr className='my-2 w-full  border-grey-dark' />
                  )}
                </div>
              );
            })
          ) : (
            <>
              <div className='text-center text-grey-light'>
                Queue is empty :(
              </div>
            </>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <HiOutlineQueueList
        onClick={() => setIsOpen(!isOpen)}
        className='h-6 w-6 cursor-pointer text-grey-light transition-all hover:scale-105 hover:text-white'
      />
    );
  }
};

export default Queue;
