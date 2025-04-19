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
  pageSize = 2
}) => {
  const [editedData, setEditedData] = useState([...data.rows]);
  
  // Calculate pagination
  const totalPages = Math.ceil(data.rows.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = [...data.rows].slice(startIndex, startIndex + pageSize);

  if (!data.rows.length) return null;

  const handleCellChange = (rowIndex: number, header: string, value: string) => {
    const newData = [...editedData];
    newData[rowIndex][header] = value;
    setEditedData(newData);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {data.headers.map((header, idx) => (
              <th
                key={header}
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate"
                style={{width: idx ? '200px' : '150px'}}
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
      <div className="mt-4 flex justify-between items-center">
        {isEditing ? (
          <div className="flex space-x-2">
            <button
              onClick={() => onSave({...data, rows: editedData})}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={onEditToggle}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : <div />}

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
