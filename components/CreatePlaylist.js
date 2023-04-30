import { PlusIcon } from '@heroicons/react/24/solid';
import { addDoc, collection } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { db } from '../firebase/firestore';

const CreatePlaylist = ({ user }) => {
  const router = useRouter();

  const addPlaylist = async () => {
    const playlistDoc = await addDoc(collection(db, 'playlists'), {
      name: 'My Playlist',
      creator: {
        name: user.displayName,
        uid: user.uid,
      },
    });
    router.push(`/playlists/${playlistDoc.id}`);
  };

  return (
    <div className='rounded-md bg-gradient-to-br from-primary to-secondary p-[0.125rem]'>
      <div
        onClick={addPlaylist}
        className='flex cursor-pointer justify-between rounded-md bg-background p-2 transition-all duration-300 hover:bg-transparent'
      >
        <div>Create playlist</div>
        <PlusIcon className='w-5' />
      </div>
    </div>
  );
};

export default CreatePlaylist;
