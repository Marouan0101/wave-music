import { tracksRef } from './firestore';
import { getDocs } from 'firebase/firestore';

// get collection data
const getUserTracks = async (user) => {
  const tracks = [];

  await getDocs(tracksRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        doc.data().artists.map((artist) => {
          if (artist.uid == user.uid) {
            tracks.push(doc.data());
          }
        });
      });
    })
    .catch((err) => {
      console.log(err.message);
    });

  return tracks;
};

export default getUserTracks;
