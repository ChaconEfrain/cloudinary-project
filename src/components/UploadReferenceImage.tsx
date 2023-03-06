import { ImageContext } from "@/context/ImageContextProvider";
import React, { ChangeEvent, useContext, useId, useRef, useState } from "react";
import Loading from "./Loading";
import ReferenceImage from "./ReferenceImage";
import UploadedImage from "./UploadedImage";

const UploadReferenceImage = () => {
  const referenceImageId = useId();
  const artworkForm = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { state, setReferenceImageUrl, turnIntoArtwork } =
    useContext(ImageContext);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const formData = new FormData(artworkForm.current!);
    const image = e.target.files![0];
    formData.append("file", image);
    formData.append("upload_preset", "ml_default");
    formData.append("timestamp", (Date.now() / 1000).toString());
    formData.append("api_key", "779464696215434");
    fetch("https://api.cloudinary.com/v1_1/efrainchacon/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        const { public_id: publicId, secure_url: url, width, height } = data;
        setReferenceImageUrl!({ publicId, url, width, height });
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };
  return (
    <article className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
      <UploadedImage />
      {state?.referenceImageUrl ? (
        <ReferenceImage />
      ) : (
        <form ref={artworkForm} className="flex justify-center items-center">
          <label
            htmlFor={referenceImageId}
            className="bg-teal-800 text-white text-xl rounded-full text-center py-2 px-6 hover:bg-teal-900 transition-all duration-300 cursor-pointer flex gap-4"
          >
            Select your artwork
            {loading && <Loading width="w-8" height="h-8" />}
          </label>
          <input
            id={referenceImageId}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            hidden
          />
        </form>
      )}
      <button
        onClick={turnIntoArtwork!}
        className="bg-teal-800 text-xl text-white rounded-full w-full text-center py-2 hover:bg-teal-900 transition-all duration-300"
      >
        Accept
      </button>
      {state?.referenceImageUrl && (
        <form ref={artworkForm}>
          <label
            htmlFor={referenceImageId}
            className="bg-teal-800 text-white text-xl rounded-full py-2 px-6 hover:bg-teal-900 transition-all duration-300 cursor-pointer flex justify-center gap-4"
          >
            Choose another artwork
            {loading && <Loading width="w-8" height="h-8" />}
          </label>
          <input
            id={referenceImageId}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            hidden
          />
        </form>
      )}
    </article>
  );
};

export default UploadReferenceImage;
