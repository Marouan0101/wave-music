import React, { useEffect, useRef, useState } from 'react';
import { TbFileUpload } from 'react-icons/tb';
import { BsFileEarmarkImage } from 'react-icons/bs';
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

const CreateTrackModal = ({ isModalOpen, setIsModalOpen, trackId }) => {
  const [user, loading] = useAuthState(auth);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState(null);
  const [collabName, setCollabName] = useState(null);
  const [trackFile, setTrackFile] = useState(null);
  const [states, setStates] = useState();
  const [queue, setQueue] = useState();

  useEffect(() => {
    // update the state every time the state document changes
    onSnapshot(doc(db, 'player', 'states'), (snapshot) => {
      setStates(snapshot.data());
    });

    // update the 'queue' state every time the queue document changes
    onSnapshot(doc(db, 'player', 'queue'), (snapshot) => {
      setQueue(snapshot.data());
    });
  }, [user]);

  const handlePlay = async () => {
    if (previewTrack.source) {
      if (queue.currentTrack !== previewTrack) {
        playTrack(previewTrack);
      }

      await updateDoc(doc(db, 'player/states'), {
        isPlaying: true,
      });
    }
  };

  const handlePause = async () => {
    await updateDoc(doc(db, 'player/states'), {
      isPlaying: false,
    });
  };

  const handleFileUpload = async (event) => {
    await updateDoc(doc(db, 'player/states'), {
      isPlaying: false,
    });

    setTrackFile(event.target.files[0]);
    //audioElement.current.src = URL.createObjectURL(event.target.files[0]);
  };

  const handleSubmit = async () => {
    // Create a storage reference for the file
    if (trackFile) {
      const storageRef = ref(storage, 'tracks/' + trackFile.name);

      // Upload the file to Firebase Storage
      await uploadBytesResumable(storageRef, trackFile)
        .then(() => {
          // Handle successful upload
          console.log('Upload successful');

          // Get the download URL for the uploaded file
          getDownloadURL(storageRef).then(async (url) => {
            console.log('File available at', url);
            previewTrack.source = url;
            // Save the download URL to your Firestore database
            await updateDoc(doc(db, 'tracks', trackId), previewTrack);
          });
        })
        .catch((error) => {
          // Handle errors during upload
          console.error('Upload failed:', error);
        });

      setIsModalOpen(false);
    }
  };

  const handleClose = async () => {
    deleteDoc(doc(db, 'tracks', trackId));
    setIsModalOpen(false);
  };

  const previewTrack = {
    image: imageFile ? URL.createObjectURL(imageFile) : placeholderImage.src,
    source: trackFile ? URL.createObjectURL(trackFile) : null,
    name: name || 'Title',
    id: trackId,
    artists: [
      {
        name: user?.displayName,
        uid: user?.uid,
      },
      {
        name: collabName,
      },
    ],
  };

  return (
      <>
          <div className="absolute z-50 h-full w-[84%] bg-black/80">
              <div className="absolute top-1/2 left-1/2 m-auto h-[30rem] w-3/4  -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-background p-8 shadow-lg">
                  <RxCross1
                      className="absolute right-4 top-4 z-50 h-7 w-7 cursor-pointer transition-all hover:scale-105"
                      onClick={handleClose}
                  />
                  <div className="grid h-full grid-cols-8 grid-rows-4 gap-x-6 gap-y-2">
                      <div className="col-span-4 row-span-4 ">
                          {/* Preview section */}
                          <div className="component relative m-auto h-full w-9/12 items-center overflow-hidden rounded-lg bg-background-light p-6  pb-0 shadow-md transition-all hover:scale-105 hover:shadow-2xl">
                              <div className="relative">
                                  <img
                                      src={previewTrack.image}
                                      className="m-auto h-72 w-72 rounded-md object-cover"
                                  />

                                  {states &&
                                  states.isPlaying &&
                                  queue.currentTrack.id === previewTrack.id ? (
                                      <div
                                          onClick={handlePause}
                                          className="component-play absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-pointer rounded-full bg-gradient-to-br from-primary to-secondary p-2 opacity-0 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                      >
                                          <PauseIcon className="h-8 w-8 text-white" />
                                      </div>
                                  ) : (
                                      <div
                                          onClick={handlePlay}
                                          className="component-play absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-pointer rounded-full bg-gradient-to-br from-primary to-secondary p-2 opacity-0 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                      >
                                          <PlayIcon className="h-8 w-8 text-white" />
                                      </div>
                                  )}
                              </div>
                              <div className="absolute bottom-6 right-1/2 translate-x-1/2 py-2 text-center">
                                  <div className="text-2xl font-semibold">
                                      {previewTrack.name}
                                  </div>

                                  <div className="flex justify-center space-x-2 font-light text-grey-light">
                                      {previewTrack.artists.map((artist) => (
                                          <div
                                              key={artist.uid}
                                              className="flex items-center"
                                          >
                                              <span className="truncate">
                                                  {artist.name}
                                              </span>
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col-span-4 col-start-5 row-span-1 row-start-4">
                          {/* publish Button */}
                          <div
                              onClick={handleSubmit}
                              className="col-span-2 cursor-pointer rounded-full bg-secondary p-3 text-center font-semibold transition-all hover:bg-primary"
                          >
                              Publish
                          </div>
                      </div>
                      <div className="col-span-4 col-start-5">
                          {/* Song name inputfield */}
                          <div className="font-semibold">Track title</div>
                          <input
                              type="text"
                              placeholder="Enter a track title"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full rounded-full bg-slate-100 py-2 px-4 text-black outline-none"
                          />
                      </div>
                      <div className="col-span-4 col-start-5">
                          <div className="font-semibold">Collaboraters</div>
                          <input
                              type="text"
                              placeholder="Enter a collaborater name"
                              value={collabName}
                              onChange={(e) => setCollabName(e.target.value)}
                              className="w-full rounded-full bg-slate-100 px-4 py-2 text-black outline-none"
                          />
                      </div>
                      <div className="col-span-2 col-start-5">
                          <div className="rounded-full bg-gradient-to-br from-primary to-secondary p-0.5 transition-all hover:scale-105">
                              <label
                                  htmlFor="songFile"
                                  className="m-auto flex cursor-pointer items-center justify-between rounded-full bg-background-light py-2 px-4 transition-all duration-200 hover:bg-transparent"
                              >
                                  <div>Track file</div>
                                  <TbFileUpload className="h-7 w-7" />
                              </label>
                              <input
                                  onChange={handleFileUpload}
                                  type="file"
                                  id="songFile"
                                  className="hidden"
                                  accept="audio/mpeg"
                              />
                          </div>
                      </div>
                      <div className="col-span-2 col-start-7">
                          <div className="rounded-full bg-gradient-to-br from-primary to-secondary p-0.5 transition-all hover:scale-105">
                              <label
                                  htmlFor="coverFile"
                                  className="m-auto flex cursor-pointer items-center justify-between rounded-full bg-background-light py-2 px-4 transition-all duration-200 hover:bg-transparent"
                              >
                                  <div>Cover</div>
                                  <BsFileEarmarkImage className="h-7 w-7" />
                              </label>
                              <input
                                  onChange={(event) =>
                                      setImageFile(event.target.files[0])
                                  }
                                  type="file"
                                  id="coverFile"
                                  className="hidden"
                                  accept="image/*"
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
