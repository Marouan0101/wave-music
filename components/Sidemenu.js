import SidemenuLink from "./SidemenuLink"
import {HomeIcon, PlusIcon, HeartIcon, MusicalNoteIcon} from '@heroicons/react/24/solid'
import Link from "next/link"
import SidemenuPlaylist from "./SidemenuPlaylist"

const Sidemenu = ({name, image}) => {
  return (
    <div className='absolute px-3 border-r border-grey-dark top-0 left-0 w-56 h-full'>
      
      {/* Profile */}
      
      <div className='flex py-3  items-center space-x-3 hover:text-primary transition-all ease-out cursor-pointer'>
          <div className="w-12 h-12  relative">

            <div className="bg-gradient-to-br from-primary to-secondary rounded-full w-[3.125rem] h-[3.125rem] -translate-x-[0.0625rem] -translate-y-[0.0625rem] absolute"></div>
            <img className="absolute rounded-full" src={image} />
          </div>

          <div className="font-semibold text-xl">{name}</div>
      </div>
  
      
      {/* Sidebar links */}
      <div className="py-4 space-y-6 font-semibold ">
        <SidemenuLink text="Home" Icon={HomeIcon} url="/" />
        <SidemenuLink text="Liked tracks" Icon={HeartIcon} url="/1" />
        <SidemenuLink text="Playlists" Icon={MusicalNoteIcon} url="/1" />

        {/* Create playlist button */}
        <div className="p-[0.125rem] rounded-md bg-gradient-to-br from-primary to-secondary">
          <Link href='/' className="capitalize">
            <div className="flex p-2 rounded-md justify-between bg-background hover:bg-transparent cursor-pointer transition-all">
              <div>
              Create playlist
              </div>
            <PlusIcon className="w-5" />
            </div>
          </Link>
        </div>
      </div>

      <hr className="border-grey-dark mb-6 my-3" />

      {/* Playlists */}
      <div className="space-y-2">
      <SidemenuPlaylist />
      <SidemenuPlaylist />
      <SidemenuPlaylist />

      </div>

    </div>
  )
}

export default Sidemenu