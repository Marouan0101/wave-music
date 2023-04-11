import { useState } from 'react';
import { RxDotsHorizontal } from 'react-icons/rx';
import { addTrackToQueue } from '../firebase/getPlayer';

const TrackOptions = ({ track }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <>
        <RxDotsHorizontal
          onClick={() => setIsOpen(!isOpen)}
          className='h-7 w-7 cursor-pointer text-primary shadow-xl transition-all hover:scale-105 '
        />
        <div className='absolute bottom-20 right-0 w-40 space-y-2 rounded-xl bg-black p-4 text-right'>
          <div
            onClick={() => addTrackToQueue(track)}
            className='cursor-pointer text-sm'
          >
            Add to queue
          </div>
          <hr className='w-full border-grey-dark' />
          <div className='cursor-default text-sm'>Add to playlist</div>
        </div>
      </>
    );
  } else {
    return (
      <RxDotsHorizontal
        onClick={() => setIsOpen(!isOpen)}
        className='h-7 w-7 cursor-pointer text-grey-light transition-all hover:scale-105 hover:text-white'
      />
    );
  }
};

export default TrackOptions;
