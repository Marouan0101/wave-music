import { useAuthState } from 'react-firebase-hooks/auth';
import Sidemenu from '../components/Sidemenu';
import { auth } from '../firebase/auth';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (user) {
    return (
      <>
        <Sidemenu name={user?.displayName} image={user?.photoURL} />
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
