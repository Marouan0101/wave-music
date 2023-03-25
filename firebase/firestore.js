import config from './config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

// init firebase app
const app = initializeApp(config);

// init services
const db = getFirestore(app);

// collection ref
const albumsRef = collection(db, 'albums');
const playlistsRef = collection(db, 'playlists');
const tracksRef = collection(db, 'tracks');
const playerRef = collection(db, 'player');

export { db, albumsRef, playlistsRef, tracksRef, playerRef };
