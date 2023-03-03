import { ChangeEvent, useContext, useEffect, useRef } from "react";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import { ImageState } from "@/types";
import { ImageContext } from "@/context/ImageContextProvider";

const UploadImage = () => {
  const isDropzoneInitialized = useRef<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { setImageState, setOriginalUrl } = useContext(ImageContext);
  useEffect(() => {
    let dropzone;
    if (!isDropzoneInitialized.current) {
      dropzone = new Dropzone("#dropzone", {
        uploadMultiple: false,
        acceptedFiles: ".jpg,.png,.webp",
        maxFiles: 1,
      });
      isDropzoneInitialized.current = true;
    }

    dropzone?.on("sending", (file, xhr, formData) => {
      // aqui podemos añadir la apiKey, configuracion
      setImageState!(ImageState.LOADING);
      formData.append("upload_preset", "ml_default");
      formData.append("timestamp", (Date.now() / 1000).toString());
      formData.append("api_key", "779464696215434");
    });

    dropzone?.on("success", (file, resp) => {
      const { public_id: publicId, secure_url: url, width, height } = resp;
      console.log(resp);
      setOriginalUrl!({ publicId, url, width, height });
    });
  }, []);

  return (
    <form
      id="dropzone"
      ref={formRef}
      action="https://api.cloudinary.com/v1_1/efrainchacon/image/upload"
      className="shadow-2xl border-dashed border-2 border-teal-800 rounded-lg aspect-video w-full flex items-center justify-center flex-col gap-2"
    >
      {/* <label className="bg-teal-800 py-2 px-8 rounded-full cursor-pointer text-white">
        Upload image
      </label>
      <div className="flex gap-2 items-center">
        <div className="w-14 h-[2px] bg-teal-800" />
        <span>Or</span>
        <div className="w-14 h-[2px] bg-teal-800" />
      </div> */}
      <p>Drop a file</p>
    </form>
  );
};

export default UploadImage;
