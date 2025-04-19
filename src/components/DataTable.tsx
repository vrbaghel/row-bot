"use client";

import { DataTableProps } from "@/types/interface";

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  if (!data.rows.length) return null;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
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
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {data.headers.map((header) => (
                <td
                  key={`${header}-${rowIndex}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {row[header] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
