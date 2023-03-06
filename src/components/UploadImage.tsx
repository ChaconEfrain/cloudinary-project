import { ChangeEvent, useContext, useEffect, useId, useRef } from "react";
import Dropzone from "dropzone";
// import "dropzone/dist/dropzone.css";
import { ImageState } from "@/types";
import { ImageContext } from "@/context/ImageContextProvider";
import Loading from "./Loading";

const UploadImage = () => {
  const uploadId = useId();
  const isDropzoneInitialized = useRef<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { state, setImageState, setOriginalUrl } = useContext(ImageContext);
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
      setOriginalUrl!({ publicId, url, width, height });
    });
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageState!(ImageState.LOADING);
    const formData = new FormData(formRef.current!);
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
        setOriginalUrl!({ publicId, url, width, height });
      })
      .catch((e) => console.error(e));
  };

  return (
    <form
      id="dropzone"
      ref={formRef}
      action="https://api.cloudinary.com/v1_1/efrainchacon/image/upload"
      onSubmit={(e) => e.preventDefault()}
      className="shadow-2xl border-dashed border-2 border-teal-800 rounded-lg aspect-video w-full flex items-center justify-center flex-col gap-2"
    >
      {state?.imageUploaded === ImageState.LOADING ? (
        <Loading width="w-12" height="h-12" />
      ) : (
        <>
          <label
            htmlFor={uploadId}
            className="bg-teal-800 text-white text-xl rounded-full text-center py-2 px-6 hover:bg-teal-900 transition-all duration-300 cursor-pointer"
          >
            Select your image
          </label>
          <input
            id={uploadId}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            hidden
          />
          <div className="flex items-center gap-3">
            <div className="w-32 h-[2px] bg-teal-800" />
            <span className="font-semibold text-teal-800 text-xl">Or</span>
            <div className="w-32 h-[2px] bg-teal-800" />
          </div>
          <p className="text-teal-800 font-semibold text-xl">
            Drop your image here
          </p>
        </>
      )}
    </form>
  );
};

export default UploadImage;
