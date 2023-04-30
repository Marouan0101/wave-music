import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ProfileSection from '../components/ProfileSection';
import CardLarge from '../components/CardLarge';
import { auth } from '../firebase/auth';
import getUserTracks from '../firebase/getUserTracks';
import CardSmall from '../components/CardSmall';
import { useRouter } from 'next/router';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import CreateTrackModal from '../components/CreateTrackModal';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firestore";
import { addTrackToQueue } from "../firebase/getPlayer";

const Profile = () => {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);
    const [tracks, setTracks] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trackId, setTrackId] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [queue, setQueue] = useState();

    useEffect(() => {
        getUserTracks(user).then((tracks) => {
            setTracks(tracks);
        });
    }, [isModalOpen]);

    const handleOptionsMenu = (event, trackId) => {
        event.preventDefault();
        setIsMenuOpen(true); // Show the menu
        setMenuPosition({ x: event.clientX, y: event.clientY });
        setTrackId(trackId); // Set the track ID
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };
    // delete the track from the database
    const handleDelete = async () => {
        deleteDoc(doc(db, "tracks", trackId));
    };

    const createTrack = async () => {
        const trackDoc = await addDoc(collection(db, "tracks"), {});

        await updateDoc(doc(db, "tracks", trackDoc.id), {
            id: trackDoc.id,
        });

        setTrackId(trackDoc.id);
        setIsModalOpen(true);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        router.push("/login");
    }

    if (user) {
        return (
            <>
                {isMenuOpen && (
                    <div
                        className="fixed inset-0 z-40"
                        onClick={handleMenuClose}
                    >
                        <div
                            className="absolute z-50 w-40 space-y-2 rounded-xl bg-black p-4 text-right shadow-lg"
                            style={{
                                top: menuPosition.y,
                                left: menuPosition.x,
                            }}
                        >
                            <div>
                                <div
                                    //onClick={() => addTrackToQueue()}
                                    className="mb-2 cursor-pointer text-sm"
                                >
                                    Add to queue
                                </div>
                                <hr className="w-full border-grey-dark" />
                                <div className="mt-2 mb-2 cursor-default text-sm">
                                    Add to playlist
                                </div>
                                <hr className="w-full border-grey-dark" />
                                <div
                                    onClick={handleDelete}
                                    className="mt-2 cursor-default text-sm"
                                >
                                    Delete track
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isModalOpen && (
                    <CreateTrackModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        trackId={trackId}
                    />
                )}
                <div className="space-y-10 p-4">
                    <div className="flex items-center space-x-4">
                        <div className="relative h-32 w-32">
                            <div className="absolute left-1/2 top-1/2 -z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-primary to-secondary blur-md"></div>
                            <img
                                src={user.photoURL}
                                className="h-full w-full rounded-xl"
                            />
                        </div>
                        <div>
                            <div className="text-5xl font-bold">
                                {user.displayName}
                            </div>
                        </div>
                    </div>

                    {/* Tracks section */}
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Tracks</h2>
                        <div className="grid grid-cols-5 gap-4">
                            <div
                                onClick={createTrack}
                                className="relative min-h-[12rem] w-full cursor-pointer rounded-md bg-gray-500 transition-all duration-200 hover:bg-gray-400"
                            >
                                <BsFillPlusCircleFill className="absolute top-1/2 right-1/2 h-12 w-12 -translate-y-1/2 translate-x-1/2 text-black" />
                            </div>

                            {/* Track */}
                            {tracks?.map((track) => {
                                return (
                                    <div
                                        onContextMenu={(event) =>
                                            handleOptionsMenu(event, track.id)
                                        }
                                    >
                                        <div
                                            key={track.id}
                                            className="col-span-1"
                                        >
                                            <CardLarge track={track} />
                                        </div>
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
