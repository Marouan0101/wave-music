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
import { auth, provider } from '../firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { playlistsRef } from '../firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import CreatePlaylist from './CreatePlaylist';
import { AiFillSetting } from 'react-icons/ai';
import anime from 'animejs';

const Sidemenu = ({ name, image }) => {
  const [playlists, setPlaylists] = useState(null);
  const [user, loading] = useAuthState(auth);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    getUserPlaylists(user).then((playlists) => {
      setPlaylists(playlists);
    });

    const unsubscribe = onSnapshot(playlistsRef, (snapshot) => {
      const updatedPlaylists = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlaylists(updatedPlaylists);
    });

    return unsubscribe;
  }, [user]);

  //console.log('User', user);
  //console.log('Playlists', playlists);

  /* document.addEventListener('DOMContentLoaded', function () {
    let elt = document.querySelectorAll('.slide-text > *');

    anime({
      targets: elt,
      translateX: '-100%',
      duration: 10000,
      easing: 'linear',
      loop: true,
    });
  }); */

  return (
    <div className='absolute top-0 left-0 h-full w-[16%] overflow-y-auto border-r border-grey-dark px-3 pb-24'>
      {/* Profile */}
      <div>
        <Link id='sidemenu-profile' href='/profile'>
          <div className='flex cursor-pointer  items-center space-x-3 py-3 transition-all duration-300 ease-out hover:text-primary'>
            <div
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className='relative h-12 w-12'
            >
              <div className='absolute h-[3.125rem] w-[3.125rem] -translate-x-[0.0625rem] -translate-y-[0.0625rem] rounded-full bg-gradient-to-br from-primary to-secondary'></div>
              <img className='absolute rounded-full' src={image} />

              <AiFillSetting className='icon-settings absolute right-1/2 bottom-1/2 z-50 h-5 w-5 translate-x-1/2 translate-y-1/2 text-grey-light opacity-0 transition-all duration-200' />
            </div>

            <div className={`text-xl font-semibold`}>{name}</div>
          </div>
        </Link>

        {isProfileOpen && (
          <div className='absolute z-50 space-y-1 rounded-lg bg-background-light p-2 text-sm shadow-lg shadow-black'>
            <div className='cursor-pointer hover:underline'>Account</div>

            <div className=' cursor-pointer hover:underline'>Preferences</div>

            <div
              onClick={async () => await signOut(auth)}
              className='cursor-pointer hover:underline'
            >
              Log out
            </div>
          </div>
        )}
      </div>

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
