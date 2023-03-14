import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import config from '../firebase/config';

initializeApp(config);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { auth, provider };
