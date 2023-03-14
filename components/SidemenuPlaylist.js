import Link from 'next/link';

const SidemenuPlaylist = ({ name, id }) => {
  return (
    <Link
      href={'playlist/' + id}
      className='flex  items-center space-x-1 text-sm font-medium'
    >
      <img className='h-[1.875rem] w-[1.875rem] rounded-md' />
      <div>{name}</div>
    </Link>
  );
};

export default SidemenuPlaylist;
