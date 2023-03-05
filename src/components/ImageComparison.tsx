import { ImageContext } from "@/context/ImageContextProvider";
import { useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import ModifiedImage from "./ModifiedImage";
import UploadedImage from "./UploadedImage";

const ImageComparison = () => {
  const { state, editAgain } = useContext(ImageContext);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch(state?.editedImageUrl!)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setUrl(url);
      });
  }, [state?.editedImageUrl]);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <article className="grid grid-cols-2 gap-8 mb-8">
      <div className="flex flex-col items-center gap-4">
        <p className="text-teal-800 uppercase font-semibold text-xl">
          Original image
        </p>
        <UploadedImage />
        <button
          onClick={editAgain!}
          className="bg-teal-800 text-white rounded-full w-full text-center py-2 hover:bg-teal-900 transition-all duration-300 mt-auto"
        >
          Edit again
        </button>
      </div>
      <div
        className={`${
          loading ? "block" : "hidden"
        } justify-self-center self-center`}
      >
        <Loading loading={loading} />
      </div>
      <div
        className={`flex-col items-center gap-4 ${loading ? "hidden" : "flex"}`}
      >
        <p className="text-teal-800 uppercase font-semibold text-xl">
          Modified image
        </p>
        <ModifiedImage handleLoad={handleLoad} />
        <a
          href={url}
          download="modified-image.jpg"
          className="bg-teal-800 text-white rounded-full w-full text-center py-2 hover:bg-teal-900 transition-all duration-300 mt-auto"
        >
          Download modified image
        </a>
      </div>
    </article>
  );
};

export default ImageComparison;
