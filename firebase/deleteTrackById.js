import { deleteDoc, doc } from 'firebase/firestore';
import { db } from './firestore';

// delete the track from the database
const deleteTrackById = async (id) => {
    deleteDoc(doc(db, 'tracks', id));
};

export default deleteTrackById;
