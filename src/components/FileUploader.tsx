"use client";

import { useState, useCallback } from "react";
import Papa from "papaparse";
import { CSVData } from "@/types/interface";

interface FileUploaderProps {
  onDataLoaded: (data: CSVData) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onDataLoaded }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
  }, [onDataLoaded]);

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center hover:border-gray-400 transition-colors">
      <label className="flex flex-col items-center cursor-pointer">
        {isLoading ? (
          <p className="text-gray-600">Processing CSV...</p>
        ) : (
          <>
            <p className="text-gray-600 mb-2">
              Click to select a CSV file
            </p>
            <p className="text-sm text-gray-400">Only .csv files accepted</p>
          </>
        )}
        <input 
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUploader;
