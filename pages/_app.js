import { useAuthState } from 'react-firebase-hooks/auth';
import Player from '../components/Player';
import Sidemenu from '../components/Sidemenu';
import { auth } from '../firebase/auth';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppProvider } from '../AppState';
import { useRouter } from 'next/router';
import Login from './login';

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Login />;
    }

    return (
        <>
            <AppProvider>
                <ToastContainer
                    position='top-center'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    theme='dark'
                />
                <Sidemenu name={user?.displayName} image={user?.photoURL} />
                <Component {...pageProps} />
                <Player />
            </AppProvider>
        </>
    );
}
