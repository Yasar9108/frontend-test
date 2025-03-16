"use client";
import { useState } from "react";
import mockData from "../mockData.json";
import { FiSearch, FiChevronUp, FiChevronDown, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const Table = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof typeof mockData[0] | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = currentPage === 1 ? 2 : mockData.length - 2;

  // Handles sorting logic
  const handleSort = (column: keyof typeof mockData[0]) => {
    setSortOrder(sortColumn === column && sortOrder === "asc" ? "desc" : "asc");
    setSortColumn(column);
  };

  // Filters and sorts data
  const filteredData = mockData
    .filter((row) =>
      Object.values(row).some((val) =>
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortColumn) return 0;
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      return sortOrder === "asc"
        ? aValue.toString().localeCompare(bValue.toString())
        : bValue.toString().localeCompare(aValue.toString());
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, (currentPage - 1) * rowsPerPage + rowsPerPage);

  return (
    <div className="p-4">
      {/* Search Input */}
      <div className="flex items-center mb-4 border rounded-md p-2 w-full max-w-md">
        <FiSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full ml-2 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {Object.keys(mockData[0]).map((col) => (
                <th
                  key={col}
                  className="border p-2 text-left cursor-pointer"
                  onClick={() => handleSort(col as keyof typeof mockData[0])}
                >
                  {col} {sortColumn === col && (sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <tr
                key={idx}
                className="border hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedRow(row)}
              >
                {Object.values(row).map((cell, index) => (
                  <td key={index} className="border p-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Interactive Preview */}
      {selectedRow && (
        <motion.div
          className="fixed bottom-4 right-4 bg-white shadow-lg border rounded-lg p-4 w-64"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-semibold">Preview</span>
            <FiX className="cursor-pointer text-gray-500" onClick={() => setSelectedRow(null)} />
          </div>
          <div className="mt-2">
            {Object.entries(selectedRow).map(([key, value]) => (
              <p key={key} className="text-sm">
                <span className="font-semibold">{key}:</span> {typeof value === "object" && value !== null ? JSON.stringify(value, null, 2) : value?.toString() ?? "N/A"}
              </p>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Table;
