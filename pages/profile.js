import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ProfileSection from '../components/ProfileSection';
import CardLarge from '../components/CardLarge';
import { auth } from '../firebase/auth';
import getUserTracks from '../firebase/getUserTracks';
import CardSmall from '../components/CardSmall';

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const [tracks, setTracks] = useState(null);
  if (loading) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    getUserTracks(user).then((tracks) => {
      setTracks(tracks);
    });
  }, [user]);

  if (user) {
    return (
      <div className='space-y-10 p-4'>
        <div className='flex items-center space-x-4'>
          <div className='relative h-32 w-32'>
            <div className='absolute left-1/2 top-1/2 -z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-primary to-secondary blur-md'></div>
            <img src={user.photoURL} className='h-full w-full rounded-xl' />
          </div>
          <div>
            <div className='text-5xl font-bold'>{user.displayName}</div>
          </div>
        </div>

        {/* Tracks section */}
        <div className='space-y-2'>
          <h2 className='text-lg font-semibold'>Tracks</h2>
          <div className='grid grid-cols-5 gap-4'>
            {/* Track */}
            {tracks?.map((track) => {
              return (
                <>
                  <div className='col-span-1'>
                    <CardLarge key={track.id} track={track} />
                  </div>
                </>
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

export default Profile;
