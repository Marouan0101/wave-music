import React from 'react'
import { TbFileUpload } from "react-icons/tb";
import { BsFileEarmarkImage } from "react-icons/bs";
import CardLarge from "../components/CardLarge";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/auth";

const CreateTrackModal = () => {
    const [user, loading] = useAuthState(auth);

    const previewTrack = {
        image: null,
        name: null,
        artists: [
            {
                name: user?.displayName,
            },
        ],
    };
    return (
        /* Body */
        <div className="absolute z-50 h-full w-[84%] bg-black/80">
            <div className="m-auto mt-10  h-5/6 w-1/2 rounded-3xl bg-background-light p-8 shadow-lg">
                {/* Preview section */}
                <div>
                    <CardLarge track={previewTrack} />
                </div>
                {/* Input section */}
                <div className="grid grid-cols-2 items-center gap-8">
                    {/* Song name inputfield */}
                    <div className="col-span-2 space-y-2">
                        <div className="font-semibold">Song name</div>
                        <input className="w-full rounded-full bg-slate-100 py-2 px-4 text-black outline-none" />
                    </div>
                    {/* Inout collabs */}
                    <div className="col-span-2 space-y-2">
                        <div className="font-semibold">Collaboraters</div>
                        <input className="w-full rounded-full bg-slate-100 px-4 py-2 text-black outline-none" />
                    </div>

                    {/* Upload song button */}
                    <div className="col-span-1">
                        <div className="rounded-full bg-gradient-to-br from-primary to-secondary p-0.5 transition-all hover:scale-105">
                            <div className="m-auto flex cursor-pointer items-center justify-between rounded-full bg-background-light py-2 px-4 transition-all duration-200 hover:bg-transparent">
                                <div>Song file</div>
                                <TbFileUpload className="h-7 w-7" />
                            </div>
                        </div>
                    </div>

                    {/* Image upload button */}
                    <div className="col-span-1">
                        <div className="rounded-full bg-gradient-to-br from-primary to-secondary p-0.5 transition-all hover:scale-105">
                            <div className="m-auto flex cursor-pointer items-center justify-between rounded-full bg-background-light py-2 px-4 transition-all duration-200 hover:bg-transparent">
                                <div>Cover</div>
                                <BsFileEarmarkImage className="h-7 w-7" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTrackModal