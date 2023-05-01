import React, { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ProfileSection from '../components/ProfileSection';
import CardLarge from '../components/CardLarge';
import { auth } from '../firebase/auth';
import getUserTracks from '../firebase/getUserTracks';
import { useRouter } from 'next/router';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import CreateTrackModal from '../components/CreateTrackModal';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import { AppContext } from '../AppState';

const Profile = () => {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);
    const [tracks, setTracks] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trackId, setTrackId] = useState(null);
    const { isTrackModified, setIsTrackModified } = useContext(AppContext);

    useEffect(() => {
        getUserTracks(user).then((tracks) => {
            setTracks(tracks);
        });
    }, [isTrackModified]);

    const createTrack = async () => {
        const trackDoc = await addDoc(collection(db, 'tracks'), {});

        await updateDoc(doc(db, 'tracks', trackDoc.id), {
            id: trackDoc.id,
        });

        setIsTrackModified(!isTrackModified);
        setTrackId(trackDoc.id);
        setIsModalOpen(true);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        router.push('/login');
    }

    if (user) {
        return (
            <>
                {isModalOpen && (
                    <CreateTrackModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        trackId={trackId}
                    />
                )}
                <div className='space-y-10 p-4'>
                    <div className='flex items-center space-x-4'>
                        <div className='relative h-32 w-32'>
                            <div className='absolute left-1/2 top-1/2 -z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-primary to-secondary blur-md'></div>
                            <img
                                src={user.photoURL}
                                className='h-full w-full rounded-xl'
                            />
                        </div>
                        <div>
                            <div className='text-5xl font-bold'>
                                {user.displayName}
                            </div>
                        </div>
                    </div>

                    {/* Tracks section */}
                    <div className='space-y-2'>
                        <h2 className='text-lg font-semibold'>Tracks</h2>
                        <div className='grid grid-cols-5 gap-4'>
                            <div
                                onClick={createTrack}
                                className='relative min-h-[12rem] w-full cursor-pointer rounded-md bg-gray-500 transition-all duration-200 hover:bg-gray-400'
                            >
                                <BsFillPlusCircleFill className='absolute top-1/2 right-1/2 h-12 w-12 -translate-y-1/2 translate-x-1/2 text-black' />
                            </div>

                            {/* Track */}
                            {tracks?.map((track) => {
                                return (
                                    <div key={track.id} className='col-span-1'>
                                        <CardLarge track={track} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div></div>
                </div>
            </>
        );
    }
    return;
};

export default Profile;
