import SidemenuLink from './SidemenuLink';
import { PlusIcon } from '@heroicons/react/24/solid';
import HomeIcon from '../public/HomeIcon.svg';
import HeartIcon from '../public/HeartIcon.svg';
import PlaylistIcon from '../public/PlaylistIcon.svg';
import Link from 'next/link';
import SidemenuPlaylist from './SidemenuPlaylist';
import { useEffect, useState } from 'react';
import getUserPlaylists from '../firebase/getUserPlaylists';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, playlistsRef } from '../firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import CreatePlaylist from './CreatePlaylist';

const Sidemenu = ({ name, image }) => {
  const [playlists, setPlaylists] = useState(null);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    getUserPlaylists(user).then((playlists) => {
      setPlaylists(playlists);
    });
  }, [user]);

  console.log('User', user);
  console.log('Playlists', playlists);
  return (
    <div className='absolute top-0 left-0 h-full w-56 border-r border-grey-dark px-3'>
      {/* Profile */}

      <Link href='/profile'>
        <div className='flex cursor-pointer  items-center space-x-3 py-3 transition-all ease-out hover:text-primary'>
          <div className='relative h-12  w-12'>
            <div className='absolute h-[3.125rem] w-[3.125rem] -translate-x-[0.0625rem] -translate-y-[0.0625rem] rounded-full bg-gradient-to-br from-primary to-secondary'></div>
            <img className='absolute rounded-full' src={image} />
          </div>

          <div className='text-xl font-semibold'>{name}</div>
        </div>
      </Link>

      {/* Sidebar links */}
      <div className='space-y-6 py-4 font-semibold '>
        <SidemenuLink text='Home' icon={HomeIcon.src} url='/' />
        <SidemenuLink text='Liked tracks' icon={HeartIcon.src} url='/1' />
        <SidemenuLink text='Playlists' icon={PlaylistIcon.src} url='/2' />

        <CreatePlaylist user={user} />
      </div>

      <hr className='my-3 mb-6 border-grey-dark' />

      {/* Playlists */}
      <div className='overflow-y-aut space-y-2'>
        {playlists?.map((playlist) => {
          return (
            <SidemenuPlaylist
              key={playlist.id}
              name={playlist.name}
              image={playlist.image}
              id={playlist.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidemenu;
