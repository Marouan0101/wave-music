import { playlistsRef } from './firestore';
import { getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './auth';

// get collection data
const getPlaylists = async (user) => {
  const playlists = [];

  await getDocs(playlistsRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().creator.uid == user.uid) {
          playlists.push({ ...doc.data(), id: doc.id });
        }
      });
    })
    .catch((err) => {
      console.log(err.message);
    });

  return playlists;
};

export default getPlaylists;
