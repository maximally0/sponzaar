
import React from 'react';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

export const Table = ({ headers, children }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            {headers.map((header, index) => (
              <th key={index} className="text-left py-3 px-4 text-gray-300 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
};

interface TableRowProps {
  children: React.ReactNode;
}

export const TableRow = ({ children }: TableRowProps) => {
  return (
    <tr className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
      {children}
    </tr>
  );
};

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export const TableCell = ({ children, className = '' }: TableCellProps) => {
  return (
    <td className={`py-3 px-4 text-gray-300 ${className}`}>
      {children}
    </td>
  );
};
