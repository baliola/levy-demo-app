import Image from 'next/image';
import type { ChangeEvent} from 'react';
import React, { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

interface FileInputProps {
  fileData: File | null;
  previewUrl: string | undefined | null;
  onChange: (files: File) => void;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  setPreviewUrl: (fileUrl: string | undefined) => void;
}

const FileInput: React.FC<FileInputProps> = ({
  onChange,
  setSelectedFile,
  setPreviewUrl,
  previewUrl,
  fileData,
}) => {
  const [errorMessage, setErrorMessage] = useState('')

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setErrorMessage('')
    const files = event.target.files;
    const regex = /^.*\.(jpg|jpeg|png|svg)$/i;

    if (files && files[0]) {
      const file = files[0];
      const fileName = file.name;
      const fileSizeInMB = file.size / (1024 * 1024)

      if (regex.test(fileName)) {
        if (fileSizeInMB > 5) {
          setErrorMessage("Maximum size is 5 MB")
          console.error("Maximum size is 5 MB")
          return;
        }
        
        onChange(file);
        setSelectedFile(file);
  
        const reader = new FileReader();
        reader.onloadend = (): void => {
          setPreviewUrl(reader.result as string);
        };
  
        reader.readAsDataURL(file);
      } else {
        setErrorMessage('Invalid file type. Only jpg, jpeg, png, or svg are allowed.')
        console.error("Invalid file type. Only jpg, jpeg, png, or svg are allowed.");
        return;
      }
    }
  };

  return (
    <div className="relative h-fit py-2 aspect-square">
      <div className={`absolute top-0 left-0 flex w-full h-full aspect-square z-10 py-2 ${errorMessage === '' ? 'opacity-70 hover:opacity-20' : 'opacity-10' } transition-all duration-500 ${previewUrl && previewUrl !== '' ? '' : ''}`}>
        <label htmlFor="image" className={`flex items-center w-full h-full cursor-pointer border rounded-xl overflow-hidden bg-[#F8F8F8] ${errorMessage !== '' ? 'border-red-500' : ''}`}>
          <div className="w-full aspect-video flex flex-col gap-y-4 justify-center bg-opacity-55">
            <div className="w-1/4 aspect-square flex mx-auto">
              <FiUploadCloud className="w-full h-full text-slate-800" />
            </div>
            <span className="tracking-wider font-semibold text-lg text-center text-slate-800">Upload Image</span>
          </div>
        </label>
      </div>
      {
        errorMessage !== '' &&
          <div className="h-full w-full flex absolute">
            <span className="mx-auto max-w-[80%] text-sm text-red-500 m-auto px-4 text-center font-bold bg-white bg-opacity-80 rounded-xl py-1">{errorMessage}</span>
          </div>
      }
      <input
        id="image"
        type="file"
        accept="image/jpeg, image/png, image/svg+xml"
        onChange={handleFileChange}
        placeholder={fileData ? fileData?.name : ''}
        multiple={false}
        className="hidden"
      />
      {
        previewUrl && previewUrl !== '' && <div className="w-full h-full">
          <Image
            src={`${previewUrl}`}
            crossOrigin=""
            alt="Preview"
            width={80}
            height={80}
            style={{ maxWidth: '100%' }}
            className="h-full w-full object-cover rounded-xl overflow-hidden"
          />
        </div>
      }
      {/* <div className='flex justify-center py-2'>
        <label htmlFor="image" className='text-center w-full'>Change Image</label>
      </div> */}
    </div>
  );
};

export default FileInput;
