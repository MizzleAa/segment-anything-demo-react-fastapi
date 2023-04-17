import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Button, Checkbox } from "react-daisyui";
import { useDropzone } from "react-dropzone";
import PhotoAlbum from "react-photo-album";
import { NavLink } from "react-router-dom";
import photos from "./helpers/photos";
import AppContext from "./hooks/createContext";
import { useLocation } from 'react-router-dom';

export interface ImagePickerProps {
  handleSelectedImage: (
    data: File | URL,
    options?: { shouldDownload?: boolean; shouldNotFetchAllModel?: boolean }
  ) => void;
  showGallery: [showGallery: boolean, setShowGallery: (e: boolean) => void];
}

const ImagePicker = ({
  handleSelectedImage,
  showGallery: [showGallery, setShowGallery],
}: ImagePickerProps) => {
  const [error, setError] = useState<string>("");
  const [isLoadedCount, setIsLoadedCount] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const {
    enableDemo: [enableDemo, setEnableDemo],
  } = useContext(AppContext)!;
  // const location = useLocation();
  const path = `${window.location.origin.toString()}`
  const isMobile = window.innerWidth < 768;

  const downloadAllImageResponses = () => {
    photos.forEach((photo, i) => {
      setTimeout(() => {
        handleSelectedImage(new URL(photo.src, path), {
          shouldDownload: true,
        });
      }, i * 30000);
    });
  };

  const handleAttemptContinue = () => {
    setAcceptedTerms(true);
    setTimeout(() => setEnableDemo(true), 500);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
    },
    onDrop: (acceptedFile) => {
      try {
        if (acceptedFile.length === 0) {
          setError("File not accepted! Try again.");
          return;
        }
        if (acceptedFile.length > 1) {
          setError("Too many files! Try again with 1 file.");
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          handleSelectedImage(acceptedFile[0]);
        };
        reader.readAsDataURL(acceptedFile[0]);
      } catch (error) {
        console.log(error);
      }
    },
    maxSize: 50_000_000,
  });

  const image = ({ imageProps }: { imageProps: any }) => {
    const { src, key, style, onClick } = imageProps;

    return (
      <img
        className="m-0 lg:hover:opacity-50 active:opacity-50"
        key={key}
        src={src}
        style={style}
        onClick={(e: any) => onClick!(e, { index: 0 })}
        onLoad={() => {
          setIsLoadedCount((prev) => prev + 1);
        }}
      ></img>
    );
  };

  const onClickPhoto = (src: any) => {
    console.log(src)
  }

  // return (
  //   <div className="pt-6 mx-4">

  //     <Button onClick={downloadAllImageResponses}>
  //       Download All Image Responses
  //     </Button>

  // <div
  //   className={`h-full w-full overflow-y-scroll pb-20 ${
  //     showGallery ? "fade-in" : ""
  //   }`}
  // >
  //       <PhotoAlbum
  //         layout={isMobile ? "columns" : "rows"}
  //         photos={photos}
  //         columns={1}
  //         onClick={(e: any) => handleSelectedImage(e.photo.src)}
  //         renderPhoto={image}
  //       />
  //     </div>
  //   </div>
  // );


  return (
    <div
      className={`h-full w-full overflow-y-scroll p-4 ${showGallery ? "fade-in" : ""
        }`}
    >
      <PhotoAlbum
        layout={isMobile ? "columns" : "rows"}
        photos={photos}
        columns={1}
        onClick={(e: any) => handleSelectedImage(e.photo.src)}
        renderPhoto={image}
      />
    </div>
  );
};

export default ImagePicker;
