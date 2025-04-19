"use client";

import { FileUploaderProps } from "@/types/interface";
import Papa from "papaparse";
import { useRef, useState } from "react";

const FileUploader: React.FC<FileUploaderProps> = ({ onDataLoaded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setIsLoading(true);
    
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        onDataLoaded({
          fileName: file.name,
          headers: results.meta.fields || [],
          rows: results.data as Record<string, string>[]
        });
        setIsLoading(false);
      },
      error: () => {
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div 
        {...(isLoading ? {} : {
          onDragOver: handleDragOver,
          onDragLeave: handleDragLeave,
          onDrop: handleDrop
        })}
        className={`border-2 border-dashed rounded-md text-center transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <label htmlFor="uploader" className="flex flex-col items-center cursor-pointer p-8">
          {isLoading ? (
            <p className="text-gray-600">Processing CSV...</p>
          ) : (
            <>
              <p className="text-gray-600 mb-2">
                {isDragging ? 'Drop the CSV file here' : 'Drag & drop a CSV file here, or click to select'}
              </p>
              <p className="text-sm text-gray-400">Only .csv files accepted</p>
            </>
          )}
          <input 
            id="uploader"
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  )
};

export default FileUploader;
