import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import { useContext } from 'react';
import { AppContext } from '../AppState';
import { toast } from 'react-toastify';
import React from 'react';

const DeleteTrackById = ({ id, buttonText, showToast }) => {
    const { isTrackModified, setIsTrackModified } = useContext(AppContext);
    // delete the track from the database
    const handleDelete = async () => {
        await deleteDoc(doc(db, 'tracks', id)).then(
            // success
            () => {
                // if showToast is true, show a toast
                if (showToast) {
                    toast.success('Track deleted');
                }
            },
            // failure
            (error) => {
                if (showToast) {
                    toast.error('Error deleting track');
                }
                console.log(error);
            }
        );

        setIsTrackModified(!isTrackModified);
    };
    return <button onClick={handleDelete}>{buttonText}</button>;
};

export default DeleteTrackById;
