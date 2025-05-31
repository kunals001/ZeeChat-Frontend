"use client";

import axios from "axios";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef} from "react";
import Image from "next/image";
import { CameraIcon } from "lucide-react";

interface UploadProps {
  coverImg: string;
  setCoverImg: (url: string) => void;
  onUploadComplete?: (url: string) => void;
}


const Upload = ({ coverImg, setCoverImg, onUploadComplete }: UploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortController = new AbortController();

  const authenticator = async (): Promise<{
    signature: string;
    expire: number;
    token: string;
    publicKey: string;
  }> => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY_3}/upload-auth`);
    const data = res.data;

    const { signature, expire, token, publicKey } = data;

    if (!signature || !token || !publicKey || !expire) {
      throw new Error("Invalid upload auth response");
    }

    return { signature, expire: Number(expire), token, publicKey };
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { signature, expire, token, publicKey } = await authenticator();

      const uploadResponse = await upload({
        file,
        fileName: file.name,
        expire,
        token,
        signature,
        publicKey,
        abortSignal: abortController.signal,
      });

     const uploadedURL = uploadResponse.url;

         if (uploadedURL) {
           setCoverImg(uploadedURL);

           if (onUploadComplete) {
             onUploadComplete(uploadedURL);  
           }
         } else {
           console.error("Upload response URL is undefined");
         }

    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <div className="relative md:w-[8vw] md:h-[8vw] w-[5vh] h-[5vh] ">
      <label className="cursor-pointer flex flex-col items-center justify-center gap-2 text-zinc-100 md:mt-9">
        <CameraIcon className="md:size-9 text-zinc-100" />
        Upload image
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </label>


      {coverImg && (
        <div className="absolute top-0 h-full w-full z-10">
          {/* <p className="text-sm invisible">Uploaded File URL:</p>
          <a href={coverImg} target="_blank" className="text-blue-600 underline invisible">
            {coverImg}
          </a> */}

          {coverImg.match(/\.(jpeg|jpg|png|gif|webp)$/) ? (
            <Image width={400} height={400} src={coverImg} alt="Preview" className="h-full w-full rounded-full object-cover" loading="lazy"/>
          ) : coverImg.match(/\.(mp4|webm)$/) ? (
            <video controls className="mt-2 w-48 h-auto rounded">
              <source src={coverImg} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Upload;
