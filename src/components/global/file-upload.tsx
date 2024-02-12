import { FileIcon } from "lucide-react";
import Image from "next/image";

type FileUploadProps = {
  apiEndpoint: "agencyLogo" | "avatar" | "subaccountLogo";
  onChange: (url?: string) => void;
  value?: string;
};

export const FileUpload = ({ apiEndpoint, onChange, value }: FileUploadProps) => {
  const type = value?.split(".").pop();

  if (value) {
    return (
      <div className="flex items-center justify-center flex-col">
        {type !== "pdf" ? (
          <div className="relative w-40 h-40">
            <Image src={value} alt="uploaded image" className="object-contain" fill />
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <FileIcon />
            <a
              href={value}
              target="_blank"
              rel="noopener_noreferrer"
              className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">
              View PDF
            </a>
          </div>
        )}
      </div>
    );
  }
  return <div></div>;
};
