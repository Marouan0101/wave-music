import { useRouter } from 'next/router';

export default function Playlist() {
  const router = useRouter();
  const id = router.query.id;

  return (
    <>
      <h1>Playlist id: {id}</h1>
    </>
  );
}
