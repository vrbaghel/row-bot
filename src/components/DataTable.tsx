"use client";

import { useState } from "react";
import { DataTableProps } from "@/types/interface";

const DataTable: React.FC<DataTableProps> = ({ data, onSave, onEditToggle, isEditing }) => {
  const [editedData, setEditedData] = useState([...data.rows]);

  if (!data.rows.length) return null;

  const handleCellChange = (rowIndex: number, header: string, value: string) => {
    const newData = [...editedData];
    newData[rowIndex][header] = value;
    setEditedData(newData);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {data.headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {editedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {data.headers.map((header) => (
                <td
                  key={`${header}-${rowIndex}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {isEditing ? (
                    <input
                      type="text"
                      value={row[header] || ''}
                      onChange={(e) => handleCellChange(rowIndex, header, e.target.value)}
                      className="block border border-gray-300 rounded px-2 py-1 w-max max-w-[calc(100%-1rem)]"
                    />
                  ) : (
                    <span className="block px-2 py-1 truncate">{row[header] || '-'}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <div className="mt-4 flex justify-end space-x-2">
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
      )}
    </div>
  );
};

export default DataTable;
