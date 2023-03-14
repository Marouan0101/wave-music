import { albumsRef } from './firestore';
import { getDocs } from 'firebase/firestore';

// get collection data
const getAlbums = async () => {
  const albums = [];
  await getDocs(albumsRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        albums.push({ ...doc.data(), id: doc.id });
      });
    })
    .catch((err) => {
      console.log(err.message);
    });

  return albums;
};

export default getAlbums();
