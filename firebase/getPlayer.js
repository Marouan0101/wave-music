import { db, playerRef } from './firestore';
import { getDocs, doc, updateDoc } from 'firebase/firestore';

// get queue data
const getQueue = async () => {
  const playerQueue = await getDocs(playerRef)
    .then((snapshot) => {
      return snapshot.docs[0].data();
    })
    .catch((err) => {
      console.log(err.message);
    });
  return playerQueue;
};

// get player state
const getState = async () => {
  const playerState = await getDocs(playerRef)
    .then((snapshot) => {
      return snapshot.docs[1].data();
    })
    .catch((err) => {
      console.log(err.message);
    });
  return playerState;
};

const playTrack = async (track) => {
  await updateDoc(doc(db, 'player/queue'), {
    currentTrack: track,
  });
};

const addTrackToQueue = async (track) => {
  await getQueue().then(async (queue) => {
    await updateDoc(doc(db, 'player/queue'), {
      tracks: [...queue.tracks, track],
    });
  });
};

export { getState, getQueue, playTrack, addTrackToQueue };
