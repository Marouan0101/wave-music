import 'firebase/auth';
import { signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider } from '../firebase/auth';
import { toast } from 'react-toastify';

const Login = () => {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);

    const signIn = async () => {
        //const result = await signInWithPopup(auth, provider);
        await signInWithRedirect(auth, provider);
        const result = await getRedirectResult(auth);
        console.log(result.user);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user) {
        router.push('/');
    }

    return (
        <div
            onClick={signIn}
            className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-gradient-to-br from-primary to-secondary px-16 py-4 text-2xl transition-all hover:scale-105 '
        >
            Sign In
        </div>
    );
};

export default Login;
