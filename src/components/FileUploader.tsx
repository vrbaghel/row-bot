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
    // Validate file size (<5MB) and type
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large (max 5MB)');
      return;
    }
    if (!file.name.endsWith('.csv')) {
      alert('Only CSV files are supported');
      return;
    }

    setIsLoading(true);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          if (!results.meta.fields || results.meta.fields.length === 0) {
            throw new Error('No headers detected - check CSV format');
          }

          const rows = results.data as Record<string, string>[];
          if (rows.length === 0) {
            throw new Error('CSV contains no data rows');
          }

          onDataLoaded({
            fileName: file.name,
            headers: results.meta.fields,
            rows
          });
        } catch (error) {
          alert(`${file.name} error: ${error}`);
          if (fileInputRef.current) fileInputRef.current.value = '';
        } finally {
          setIsLoading(false);
        }
      },
      error: (error) => {
        alert(`Failed to parse CSV: ${error.message}`);
        setIsLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    });
  };

  return (
    // File upload zone with drag-and-drop support
    <div className="space-y-4 bg-white">
      <div 
        {...(isLoading ? {} : {
          onDragOver: handleDragOver,
          onDragLeave: handleDragLeave,
          onDrop: handleDrop
        })}
        className={`border-2 border-dashed rounded-md text-center transition-colors ${
          isDragging ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
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
