import Link from 'next/link'
import React from 'react'

const SidemenuLink = ({text, Icon, url}) => {
 

  return (
      <div className={`flex space-x-3 items-center ${
        url === window.location.pathname ? 'sidemenu_link--active' : ''
      }`}>
      <Icon className='h-5 w-5' />
      <Link href={url} className='capitalize'>{text}</Link>
    </div>
  )
}

export default SidemenuLink