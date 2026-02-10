"use client";

// REACT //
import Cropper, { Area } from "react-easy-crop";
import { useCallback, useEffect, useRef, useState } from "react";

// OTHERS //
import Paperclip1 from "../icons/neevo-icons/Paperclip1";
import Paperclip2 from "../icons/neevo-icons/Paperclip2";
import Add1 from "../icons/neevo-icons/Add1";
import { on } from "events";
import Image from "next/image";

interface ImageUploadProps {
  /** Callback function to receive the cropped image as a base64 string */
  onImageCropped?: (base64Image: string) => void;
  /** Optional initial image URL */
  imageUrl?: string;
}

export default function ImageUpload({
  onImageCropped,
  imageUrl,
}: ImageUploadProps) {
  // Define Refs
  const inputRef = useRef<HTMLInputElement>(null);

  // Define States
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  // Define Helper Functions
  /* Opens the file input dialog */
  const openGallery = () => inputRef.current?.click();

  /* Callback when cropping is complete */
  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  /* Handles file selection */
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a URL for the selected image file
    setImage(URL.createObjectURL(file));
  };

  /* Creates the cropped image */
  const createCroppedImage = async () => {
    if (!image || !croppedAreaPixels) return;

    // Create an image element from the selected file
    const img = await createImage(image);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    // Draw the cropped area onto the canvas
    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
    );

    // Convert the canvas to a base64 image
    const base64 = canvas.toDataURL("image/jpeg");
    setCroppedImage(base64);
    onImageCropped && onImageCropped(base64);
    // Clean up
    setImage(null);
  };

  useEffect(() => {
    setCroppedImage(imageUrl || null);
  }, [imageUrl]);
  return (
    <div className="flex flex-col gap-4">
      {/* Preview */}
      <div
        onClick={openGallery}
        className="size-[95px] flex cursor-pointer relative"
      >
        <div className="w-full h-full overflow-hidden rounded-[32px] border  border-n-400">
          <img
            src={croppedImage ?? "/images/defaults/default-coach.png"}
            className="object-cover w-full h-full"
            alt="Uploaded"
            width={95}
            height={95}
          />
        </div>
        {!croppedImage ? (
          <Paperclip2
            primaryColor="var(--color-n-600)"
            className="size-[29px] text-n-400 absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        ) : (
          <button
            className="size-10 rounded-full border border-n-400 bg-n-100 flex items-center justify-center absolute -bottom-4 left-1/2 -translate-x-1/2"
            onClick={(e) => {
              e.stopPropagation();
              setCroppedImage(null);
              setImage(null);
              onImageCropped && onImageCropped("");
            }}
          >
            <Add1
              primaryColor="var(--color-n-600)"
              className="size-4 rotate-45"
            />
          </button>
        )}
      </div>

      {/* Crop Modal */}
      {image && (
        <div className="fixed inset-0 bg-black/70 z-1 flex flex-col items-center justify-center gap-4">
          <div className="relative w-[90vw] h-[60vh] bg-black">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1} // ✅ square crop
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          <button
            onClick={createCroppedImage}
            className="px-6 py-2 bg-white rounded"
          >
            Crop & Save
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFile}
      />
    </div>
  );
}

/* helper */
function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}
