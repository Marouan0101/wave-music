import { getStorage } from 'firebase/storage';
import { app } from './firestore';

const storage = getStorage(app);

export default storage;
