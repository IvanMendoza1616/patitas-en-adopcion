//import { XMarkIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import Button from "../UI/Button";

type Props = {
  currentImage: string;
  shelter?: boolean;
};

export default function ImageInput({ currentImage, shelter }: Props) {
  const [image, setImage] = useState(currentImage);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0])
      setImage(URL.createObjectURL(e.target.files[0]));
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
    <div>
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
        <div className="relative flex flex-col items-center justify-center gap-4">
          <Image
            src={image}
            width={shelter ? 200 : 750}
            height={shelter ? 200 : 750}
            className="aspect-square rounded-lg object-cover"
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
          <Button type="button" variant="secondary" onClick={handleClick}>
            Change Image
          </Button>
        </div>
      ) : (
        <div
          className={`flex h-[400px] w-full flex-col items-center justify-center gap-4 rounded-lg border ${isDragging ? "border-primary-light bg-primary-light" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>Drop an image to upload</p>
          <p>or</p>
          <Button type="button" variant="secondary" onClick={handleClick}>
            Select Image
          </Button>
        </div>
      )}
    </div>
  );
}
