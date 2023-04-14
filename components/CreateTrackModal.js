import React, { useState } from "react";
import { TbFileUpload } from "react-icons/tb";
import { BsFileEarmarkImage } from "react-icons/bs";
import CardLarge from "../components/CardLarge";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/auth";
import placeholderImage from "../public/placeholderImage.jpg";

const CreateTrackModal = () => {
    const [user, loading] = useAuthState(auth);
    const [imageFile, setImageFile] = useState(null);
    const [name, setName] = useState(null);
    const [collabs, setCollabs] = useState(null);

    const previewTrack = {
        image: imageFile
            ? URL.createObjectURL(imageFile)
            : placeholderImage.src,
        name: name || "Title",
        artists: [
            {
                name: user?.displayName,
            },
            {
                name: collabs,
            },
        ],
    };

    

    return (
        /* Body */
        <div className="absolute z-50 h-full w-[84%] bg-black/80">
            <div className="m-auto mt-10  h-5/6 w-1/2 rounded-3xl bg-background p-8 shadow-lg">
                {/* Preview section */}
                <div className="m-auto h-64 w-64">
                    <CardLarge track={previewTrack} />
                </div>

                {/* Input section */}
                <div className="mt-10 grid grid-cols-2 items-center gap-8">
                    {/* Song name inputfield */}
                    <div className="col-span-2 space-y-2">
                        <div className="font-semibold">Track title</div>
                        <input
                            type="text"
                            placeholder="Enter a track title"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-full bg-slate-100 py-2 px-4 text-black outline-none"
                        />
                    </div>
                    {/* Inout collabs */}
                    <div className="col-span-2 space-y-2">
                        <div className="font-semibold">Collaboraters</div>
                        <input
                            type="text"
                            placeholder="Enter a collaborater name"
                            value={collabs}
                            onChange={(e) => setCollabs(e.target.value)}
                            className="w-full rounded-full bg-slate-100 px-4 py-2 text-black outline-none"
                        />
                    </div>

                    {/* Upload song button */}
                    <div className="col-span-1">
                        <div className="rounded-full bg-gradient-to-br from-primary to-secondary p-0.5 transition-all hover:scale-105">
                            <label
                                htmlFor="songFile"
                                className="m-auto flex cursor-pointer items-center justify-between rounded-full bg-background-light py-2 px-4 transition-all duration-200 hover:bg-transparent"
                            >
                                <div>Track file</div>
                                <TbFileUpload className="h-7 w-7" />
                            </label>
                            <input
                                type="file"
                                id="songFile"
                                className="hidden"
                                accept="audio/*"
                            />
                        </div>
                    </div>

                    {/* Image upload button */}
                    <div className="col-span-1">
                        <div className="rounded-full bg-gradient-to-br from-primary to-secondary p-0.5 transition-all hover:scale-105">
                            <label
                                htmlFor="coverFile"
                                className="m-auto flex cursor-pointer items-center justify-between rounded-full bg-background-light py-2 px-4 transition-all duration-200 hover:bg-transparent"
                            >
                                <div>Cover</div>
                                <BsFileEarmarkImage className="h-7 w-7" />
                            </label>
                            <input
                                onChange={(event) =>
                                    setImageFile(event.target.files[0])
                                }
                                type="file"
                                id="coverFile"
                                className="hidden"
                                accept="image/*"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTrackModal;
