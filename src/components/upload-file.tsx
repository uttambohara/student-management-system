import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import React, { forwardRef } from "react";

interface UploadFileProps {
  provider: "imageUploader";
  value: string;
  onChange: (value: string) => void;
}

const UploadFile = forwardRef(
  ({ value, provider, onChange }: UploadFileProps, ref) => {
    const notPdf = value?.split(".")[1] !== "pdf";

    if (value && notPdf) {
      return (
        <div className="flex items-center justify-center">
          <div className="relative h-24 w-24">
            <Image
              src={value}
              alt={"User Image"}
              fill
              priority
              className="rounded-full object-cover"
            />
            <div
              className="absolute bottom-0 flex min-w-fit cursor-pointer items-center gap-1 rounded-full bg-red-700/70 p-1 text-xs text-white"
              onClick={() => onChange("")}
            >
              <X size={13} />
              <span>Remove photo</span>
            </div>
          </div>
        </div>
      );
    }
    return (
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res[0].url) {
            onChange(res[0].url);
          }
          console.log("Files: ", res);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    );
  },
);

UploadFile.displayName = "UploadFile";

export default UploadFile;
