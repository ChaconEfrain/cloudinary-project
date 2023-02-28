import Head from "next/head";
import { useContext, useEffect } from "react";
import UploadImage from "@/components/UploadImage";
import CropperScript from "@/cropper_script/Script";
import { ImageState } from "@/types";
import { ImageContext } from "@/context/ImageContextProvider";
import EditOptions from "@/components/EditOptions";

export default function Home() {
  const { state } = useContext(ImageContext);
  return (
    <>
      <Head>
        <title>Image Artisan</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <CropperScript />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-8 items-center justify-center max-w-5xl m-auto px-8">
        <header>
          <h1 className="text-5xl text-center mt-6">
            <span className="uppercase text-teal-800 -tracking-[5px]">
              Image
            </span>
            <span className="italic text-teal-500 tracking-wide ml-3">
              artisan
            </span>
          </h1>
        </header>
        {state?.imageUploaded === ImageState.DONE ? (
          <EditOptions />
        ) : (
          <UploadImage />
        )}
      </main>
    </>
  );
}
