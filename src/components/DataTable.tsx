"use client";

import { DataTableProps } from "@/types/interface";
import { useState } from "react";

const DataTable: React.FC<DataTableProps> = ({
  data,
  onSave,
  onEditToggle,
  isEditing,
  currentPage,
  setCurrentPage,
  pageSize = 10
}) => {
  const [editedData, setEditedData] = useState([...data.rows]);

  // Calculate pagination
  const totalPages = Math.ceil(data.rows.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = [...data.rows].slice(startIndex, startIndex + pageSize);

  if (!data.rows.length) return null;

  // Handle edits to cell values while preserving pagination state
  const handleCellChange = (rowIndex: number, header: string, value: string) => {
    const newData = [...editedData]; // Copy current data to avoid direct state mutation
    // Map paginated row index back to full dataset index  
    const originalIndex = startIndex + rowIndex;
    newData[originalIndex][header] = value; // Update specific cell
    setEditedData(newData); // Save edited data
  };

  return (
    <div className="relative">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed divide-y divide-gray-200 mb-5">
          <thead className="bg-gray-100">
            <tr>
              {data.headers.map((header, idx) => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 pt-3 pb-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider truncate"
                  style={{ width: idx ? '200px' : '150px' }}
                >
                  <span className="truncate block">{header}</span>
                  {/* {header} */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {data.headers.map((header) => (
                  <td
                    key={`${header}-${rowIndex}`}
                    className="px-4 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {isEditing ? (
                      <input
                        type="text"
                        value={row[header] || ''}
                        onChange={(e) => handleCellChange(rowIndex, header, e.target.value)}
                        className="block border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <div className="relative truncate px-2 py-1" title={row[header] || undefined}>
                        {row[header] || '-'}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        {isEditing ? (
          <div className="flex space-x-2">
            <button
              onClick={() => onSave({ ...data, rows: editedData })}
              className="bg-black hover:bg-white text-white hover:text-black border-2 border-black font-medium py-2 px-4 rounded-full transition-colors cursor-pointer"
            >
              Save Changes
            </button>
            <button
              onClick={onEditToggle}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-full transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button
              disabled
              title="CRM integration coming soon"
              className="bg-gray-200 text-gray-400 font-medium py-2 px-4 rounded-full transition-colors cursor-not-allowed flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
              </svg>
              Sync to CRM
            </button>
          </div>
        )}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600/90 hover:bg-blue-50 cursor-pointer'}`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600/90 hover:bg-blue-50 cursor-pointer'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
