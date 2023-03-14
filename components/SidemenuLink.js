import Link from 'next/link';
import React from 'react';

const SidemenuLink = ({ text, icon, url }) => {
  return (
    <div
      className={`flex items-center space-x-3 ${
        url === window.location.pathname ? 'sidemenu_link--active' : ''
      }`}
    >
      <img src={icon} className='h-5 w-5 opacity-30' />
      <Link href={url} className='capitalize'>
        {text}
      </Link>
    </div>
  );
};

export default SidemenuLink;
