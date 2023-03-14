import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/auth';

const profile = () => {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (user) {
    return (
      <div className='p-4'>
        <div className='flex items-center space-x-4'>
          <img src={user.photoURL} className='w-32 rounded-full' />
          <div>
            <div className='text-5xl font-bold'>{user.displayName}</div>
          </div>
        </div>
      </div>
    );
  }
  return;
};

export default profile;
