//import { XMarkIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

type Props = {
  currentImage: string;
};

export default function ImageInput({ currentImage }: Props) {
  const [image, setImage] = useState(currentImage);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  //Need to add React. in order for type to not throw error
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Get the bounds of the current element
    const rect = e.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = e;

    // Check if the mouse is still inside the parent div's bounds
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(URL.createObjectURL(e.dataTransfer.files[0]));

      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(e.dataTransfer.files[0]);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  };

  return (
    <div className="flex h-[400px] items-center justify-center bg-gray-300 p-5">
      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        name="image"
        id="image"
        accept="image/*"
        onChange={handleImageChange}
      />
      {image ? (
        <div className="relative flex max-w-[300px] flex-col items-center justify-center gap-4">
          <Image
            src={image}
            width={400}
            height={400}
            className="aspect-square object-cover"
            alt="Preview image"
          />
          {/*
           <button
            type="button"
            onClick={() => {
              setImage("");
            }}
            className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-full bg-gray-200 p-1"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
          */}

          <button
            className="bg-gray-200 px-2 py-1"
            onClick={handleClick}
            type="button"
          >
            Change Image
          </button>
        </div>
      ) : (
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-1 ${isDragging ? "bg-gray-200" : " "}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>Drop an image to upload</p>
          <p>or</p>
          <button
            className="bg-gray-200 px-2 py-1"
            onClick={handleClick}
            type="button"
          >
            Select Image
          </button>
        </div>
      )}
    </div>
  );
}
