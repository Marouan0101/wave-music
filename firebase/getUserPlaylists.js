import { playlistsRef } from './firestore';
import { getDocs } from 'firebase/firestore';

// get collection data
const getUserPlaylists = async (user) => {
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

export default getUserPlaylists;
