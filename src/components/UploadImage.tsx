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
import {UploadIcon } from "lucide-react";

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
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/upload-auth`);
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
             onUploadComplete(uploadedURL);  // ✅ Now this is guaranteed to be string
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
    <div>
      <label className="bg-prime hover:bg-second text-white font-bold md:p-2 p-3 rounded-lg cursor-pointer inline-block absolute bottom-0">
        <UploadIcon className="md:size-7 size-6" />

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </label>


      {coverImg && (
        <div className="mt-4">
          {coverImg.match(/\.(jpeg|jpg|png|gif)$/) ? (
            <Image width={400} height={400} src={coverImg} alt="Preview" className="mt-2 w-48 h-auto rounded" loading="eager"/>
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
