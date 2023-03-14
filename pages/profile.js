import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ProfileSection from '../components/ProfileSection';
import { auth } from '../firebase/auth';
import getUserTracks from '../firebase/getUserTracks';

const profile = () => {
  const [user, loading] = useAuthState(auth);
  const [tracks, setTracks] = useState(null);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (user) {
    useEffect(() => {
      getUserTracks(user).then((tracks) => {
        setTracks(tracks);
      });
    }, [user]);

    return (
      <div className='space-y-10 p-4'>
        <div className='flex items-center space-x-4'>
          <img src={user.photoURL} className='w-32 rounded-full' />
          <div>
            <div className='text-5xl font-bold'>{user.displayName}</div>
          </div>
        </div>

        {/* Tracks section */}
        <div className='space-y-2'>
          <div className='text-lg font-semibold'>Tracks</div>
          <div className='grid grid-cols-6'>
            {/* Track */}
            {tracks?.map((track) => {
              return (
                <div className=' col-span-1 items-center rounded-lg bg-background-light p-3 pb-0'>
                  <img src={track.image} className='w-full rounded-md' />
                  <div className='py-2 text-center'>{track.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div></div>
      </div>
    );
  }
  return;
};

export default profile;
