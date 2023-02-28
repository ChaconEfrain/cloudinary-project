import { Cloudinary } from "@cloudinary/url-gen";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "efrainchacon",
  },
  url: {
    secure: true,
  },
});

export default cloudinary;
