import React, { useEffect, useRef, useState } from 'react';
import { TbFileUpload } from 'react-icons/tb';
import { BsFileEarmarkImage } from 'react-icons/bs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/auth';
import placeholderImage from '../public/placeholderImage.jpg';
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import { playTrack } from '../firebase/getPlayer';
import { deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import { RxCross1 } from 'react-icons/rx';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import storage from '../firebase/storage';
import CardLarge from './CardLarge';
import { toast } from 'react-toastify';
import DeleteTrackById from './DeleteTrackById';

const CreateTrackModal = ({ isModalOpen, setIsModalOpen, trackId }) => {
    const [user, loading] = useAuthState(auth);
    const [imageFile, setImageFile] = useState(null);
    const [name, setName] = useState(null);
    const [collabName, setCollabName] = useState(null);
    const [trackFile, setTrackFile] = useState(null);
    const [states, setStates] = useState();
    const [queue, setQueue] = useState();
    const [isPublishLoading, setIsPublishLoading] = useState(false);

    useEffect(() => {
        // update the state every time the state document changes
        onSnapshot(doc(db, 'player', 'states'), (snapshot) => {
            setStates(snapshot.data());
        });

        // update the 'queue' state every time the queue document changes
        onSnapshot(doc(db, 'player', 'queue'), (snapshot) => {
            setQueue(snapshot.data());
        });
    });

    // upload the track file
    const handleFileUpload = async (event) => {
        await updateDoc(doc(db, 'player/states'), {
            isPlaying: false,
        });
        // set the track file
        setTrackFile(event.target.files[0]),
        toast.success('Track uploaded!');
        //audioElement.current.src = URL.createObjectURL(event.target.files[0]);
    };

    // upload the image file
    const handleImageUpload = async (event) => {
        await updateDoc(doc(db, 'player/states'), {
            isPlaying: false,
        });
        // set the image file
        setImageFile(event.target.files[0]),
        toast.success('Image uploaded!');
    };

    const handleSubmit = async () => {
        setIsPublishLoading(true);
        // Create a storage reference for the file
        if (trackFile && imageFile) {
            const storageRef = ref(storage, 'tracks/' + trackFile.name);
            const imageStorageRef = ref(
                storage,
                'tracks/images/' + imageFile.name
            );

            // Upload the files to Firebase Storage
            await Promise.all([
                uploadBytesResumable(storageRef, trackFile),
                uploadBytesResumable(imageStorageRef, imageFile),
            ])
                .then(async () => {
                    // Handle successful upload
                    console.log('Upload successful');

                    // Get the download URLs for the uploaded files
                    const [trackUrl, imageUrl] = await Promise.all([
                        getDownloadURL(storageRef),
                        getDownloadURL(imageStorageRef),
                    ]);

                    console.log('Track available at', trackUrl);
                    console.log('Image available at', imageUrl);

                    previewTrack.source = trackUrl;
                    previewTrack.image = imageUrl;

                    // Save the download URLs to the Firestore database
                    await updateDoc(doc(db, 'tracks', trackId), previewTrack);
                    toast.success(previewTrack.name + ' has been published!');
                })
                .catch((error) => {
                    // Handle errors during upload
                    console.error('Upload failed:', error);
                    toast.success('Publish failed :(');
                });

            setIsModalOpen(false); // close the modal
            setIsPublishLoading(false); // reset the loading state
        }
    };

    // delete the track from the database
    const handleClose = async () => {
        setIsModalOpen(false); // close the modal
    };

    // create a preview track object
    const previewTrack = {
        image: imageFile
            ? URL.createObjectURL(imageFile)
            : placeholderImage.src, // use the placeholder image if no image is uploaded
        source: trackFile ? URL.createObjectURL(trackFile) : null, //if no track is uploaded, set the source to null
        name: name || 'Title', // use the placeholder title if no title is entered
        id: trackId, //get the track id from the database
        artists: [
            // get the user's name and uid from the auth object
            {
                name: user?.displayName,
                uid: user?.uid,
            },
        ],
    };

    // add the collaborator's name to the preview track object if it exists
    if (collabName) {
        previewTrack.artists.push({
            name: collabName,
        });
    }

    return (
        <>
            {/* Background shadow*/}
            <div className='absolute z-50 h-full w-[84%] bg-black/80'>
                {/* Pop up modal */}
                <div className='absolute top-0 left-1/2 m-auto h-[80%] w-3/4  -translate-x-1/2  overflow-y-auto rounded-3xl bg-background p-8 shadow-lg'>
                    {/* Close button: when pressed run handleClose - closes the modal */}

                    <DeleteTrackById
                        id={trackId}
                        buttonText={
                            <RxCross1
                                className='absolute right-4 top-4 z-50 h-7 w-7 cursor-pointer transition-all hover:scale-105'
                                onClick={handleClose}
                            />
                        }
                    />
                    <div className='grid h-full grid-cols-8 grid-rows-4 gap-x-6 gap-y-2'>
                        <div className='col-span-4 row-span-4 '>
                            {/* Preview section */}
                            <CardLarge track={previewTrack} />
                        </div>
                        <div className='col-span-4 col-start-5 row-span-1 row-start-4'>
                            {/* publish Button */}
                            <button
                                onClick={
                                    () =>
                                        !isPublishLoading && // check if the track is loading
                                        handleSubmit() // if the track is not loading, run handleSubmit
                                }
                                className='item-center relative col-span-2 flex w-full cursor-pointer rounded-full bg-secondary p-3 text-center font-semibold transition-all hover:bg-primary disabled:cursor-not-allowed disabled:bg-primary disabled:opacity-30'
                                /* disable the button if the track is loading */
                                disabled={isPublishLoading}
                            >
                                <div className='flex-1'>Publish</div>
                                {
                                    // if the track is loading, show the loading icon
                                    isPublishLoading && (
                                        <AiOutlineLoading3Quarters className='absolute right-4 h-8 w-8 animate-spin' />
                                    )
                                }
                            </button>
                        </div>
                        <div className='col-span-4 col-start-5'>
                            {/* Song name inputfield */}
                            <div className='font-semibold'>Track title</div>
                            <input
                                type='text'
                                placeholder='Enter a track title'
                                value={name}
                                onChange={
                                    // when the input field changes, set the name to the input value
                                    (e) => setName(e.target.value)
                                }
                                className='w-full rounded-full bg-slate-100 py-2 px-4 text-black outline-none'
                            />
                        </div>
                        <div className='col-span-4 col-start-5'>
                            <div className='font-semibold'>Collaboraters</div>
                            <input
                                type='text'
                                placeholder='Enter a collaborater name'
                                value={collabName}
                                onChange={
                                    // when the input field changes, set the collabName to the input value
                                    (e) => setCollabName(e.target.value)
                                }
                                className='w-full rounded-full bg-slate-100 px-4 py-2 text-black outline-none'
                            />
                        </div>
                        <div className='col-span-2 col-start-5'>
                            <div className='rounded-full bg-gradient-to-br from-primary to-secondary p-0.5 transition-all hover:scale-105'>
                                <label
                                    htmlFor='songFile' // when the label is clicked, click the input field
                                    className='m-auto flex cursor-pointer items-center justify-between rounded-full bg-background-light py-2 px-4 transition-all duration-200 hover:bg-transparent'
                                >
                                    <div>Track file</div>
                                    <TbFileUpload className='h-7 w-7' />
                                </label>
                                <input
                                    onChange={
                                        // when the input field changes, set the songFile to the input value
                                        handleFileUpload
                                    }
                                    type='file'
                                    id='songFile'
                                    className='hidden'
                                    accept='audio/mpeg' // only accept mp3 files
                                />
                            </div>
                        </div>
                        <div className='col-span-2 col-start-7'>
                            <div className='rounded-full bg-gradient-to-br from-primary to-secondary p-0.5 transition-all hover:scale-105'>
                                <label
                                    htmlFor='coverFile'
                                    className='m-auto flex cursor-pointer items-center justify-between rounded-full bg-background-light py-2 px-4 transition-all duration-200 hover:bg-transparent'
                                >
                                    <div>Cover</div>
                                    <BsFileEarmarkImage className='h-7 w-7' />
                                </label>
                                <input
                                    onChange={
                                        // when the input field changes, set the coverFile to the input value
                                        handleImageUpload
                                    }
                                    type='file'
                                    id='coverFile'
                                    className='hidden'
                                    accept='image/*'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateTrackModal;
