"use client";

import { useState } from "react";
import FileUploader from "@/components/FileUploader";
import DataTable from "@/components/DataTable";
import { CSVData } from "@/types/interface";

export default function Home() {
  const [csvData, setCsvData] = useState<CSVData | null>(null);

  const handleReset = () => {
    setCsvData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">CSV Viewer</h1>
        
        {!csvData ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <FileUploader onDataLoaded={setCsvData} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-700">Data Preview</h2>
                <p className="text-gray-500 text-sm">
                  Showing {csvData.rows.length} rows from {csvData.fileName}
                </p>
              </div>
              <button
                onClick={handleReset}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition-colors"
              >
                Upload New File
              </button>
            </div>
            <DataTable data={csvData} />
          </div>
        )}
      </main>
    </div>
  );
}
