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
          className='h-7 w-7 cursor-pointer text-primary transition-all hover:scale-105 '
        />
        <div className='absolute bottom-20 right-0 w-72 rounded-xl bg-black'>
          <div
            onClick={() => addTrackToQueue(track)}
            className='cursor-pointer border-b border-grey-dark'
          >
            Add to queue
          </div>
          <div className='cursor-default'>Add to playlist</div>
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
