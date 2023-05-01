import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import { useContext } from 'react';
import { AppContext } from '../AppState';
import { toast } from 'react-toastify';
import React from 'react';

const DeleteTrackById = ({ id, buttonText }) => {
    const { isTrackModified, setIsTrackModified } = useContext(AppContext);
    // delete the track from the database
    const handleDelete = () => {
        deleteDoc(doc(db, 'tracks', id)).then(
            // success
            () => {
                toast.success('Track deleted');
            },
            // failure
            (error) => {
                toast.error('Error deleting track');
                console.log(error);
            }
        );

        setIsTrackModified(!isTrackModified);
    };
    return <button onClick={handleDelete}>{buttonText}</button>;
};

export default DeleteTrackById;
