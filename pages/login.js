import 'firebase/auth';
import { signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider} from '../firebase/auth';


const Login = () => {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);
    
    const signIn = async () => {
        const result = await signInWithPopup(auth, provider)
        console.log(result.user)
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (user) {
        router.push("/")
    }
  return (
    <div onClick={signIn}>Sign In</div>
  )
}

export default Login