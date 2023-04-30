import { useRouter } from 'next/router';

export default function PlaylistPage() {
  const router = useRouter();
  const id = router.query.id;

  return (
    <>
      <h1>Playlist id: {id}</h1>
    </>
  );
}
