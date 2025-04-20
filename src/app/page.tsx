"use client";

import { useState, useEffect } from "react";
import FileUploader from "@/components/FileUploader";
import DataTable from "@/components/DataTable";
import { CSVData } from "@/types/interface";
import Image from "next/image";

export default function Home() {
  const [csvData, setCsvData] = useState<CSVData | null>(null);

  // Reset the app state when uploading a new file
  const handleReset = () => {
    setCsvData(null);    // Clear current CSV data
    setIsEditing(false); // Exit edit mode if active
  };

  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [csvData]);

  const handleSave = (updatedData: CSVData) => {
    setCsvData(updatedData);
    setIsEditing(false);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className={`min-h-screen bg-white p-10 ${!csvData ? 'flex flex-col justify-center items-center' : ''}`}>
      <main className="max-w-6xl mx-auto">
        <div className="flex flex-col justify-center items-center mb-8">
          <Image width={100} height={100} src="/logo.png" alt="rowbot app logo" className="w-16 object-contain bg-black rounded-full p-2 mb-1" />
          <h1 className="text-3xl font-bold text-gray-800">*rowbot</h1>
          <h2 className="text-base font-base text-gray-800">Lightweight tool for parsing tabular data and bridging CSVs with CRM models.</h2>
        </div>

        {!csvData ? (
          <div className="bg-gray-100 rounded-lg shadow-md p-6 mb-8 mt-10">
            <FileUploader onDataLoaded={setCsvData} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="flex items-center gap-1 -ml-2">
                  <div className="w-8 h-8 p-1">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H10M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V10M9 17H11.5M9 13H14M9 9H10M14 21L16.025 20.595C16.2015 20.5597 16.2898 20.542 16.3721 20.5097C16.4452 20.4811 16.5147 20.4439 16.579 20.399C16.6516 20.3484 16.7152 20.2848 16.8426 20.1574L21 16C21.5523 15.4477 21.5523 14.5523 21 14C20.4477 13.4477 19.5523 13.4477 19 14L14.8426 18.1574C14.7152 18.2848 14.6516 18.3484 14.601 18.421C14.5561 18.4853 14.5189 18.5548 14.4903 18.6279C14.458 18.7102 14.4403 18.7985 14.405 18.975L14 21Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-700 ">
                    {csvData.fileName}
                  </h2>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  Showing {csvData.rows.length} rows from file
                </p>
              </div>
              <div className="flex space-x-2">
                {!isEditing ? (
                  <button
                    onClick={toggleEdit}
                    type="button"
                    className="bg-black hover:bg-white text-white hover:text-black border-2 border-black font-medium p-2.5 rounded-full transition-colors w-10 h-10 cursor-pointer"
                  >
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                  </button>
                ) : null}
                <button
                  onClick={handleReset}
                  type="button"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-full transition-colors cursor-pointer"
                >
                  Upload New File
                </button>
              </div>
            </div>
            <DataTable
              data={csvData}
              onSave={handleSave}
              onEditToggle={toggleEdit}
              isEditing={isEditing}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </main>
    </div>
  );
}
