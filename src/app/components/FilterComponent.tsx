"use client";
import { useState, useEffect, useRef } from "react";
import { FiPlus, FiSearch, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";

const categories = ["Dimensions", "Tags", "Metrics"];
const filterOptions = {
  Tags: ["Character", "Background", "Elements", "CTA Position", "CTA Text"],
  Metrics: ["Spends", "Clicks", "Impressions", "Conversions", "CTR", "CPC"],
  Dimensions: ["Width", "Height", "Aspect Ratio", "Resolution"],
};

const characterOptions = ["Pumpkin", "Cat", "Ghost", "Egg"];

const FilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tags");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleValue = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const applyFilters = () => {
    setFilterCount(selectedValues.length);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-100 border border-green-400 text-green-700 font-medium hover:bg-green-200"
      >
        <FiPlus className="text-green-600" /> Filters {filterCount > 0 && `(${filterCount})`}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute left-0 mt-2 w-80 bg-white shadow-lg border rounded-lg"
        >
          {!selectedFilter ? (
            <>
              <div className="p-2 border-b">
                <div className="flex items-center p-2 border rounded-md">
                  <FiSearch className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full ml-2 outline-none"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex border-b">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`p-2 w-1/3 text-center ${
                      selectedCategory === category ? "border-b-2 border-black text-black font-semibold" : "text-gray-500 hover:text-gray-800"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="p-2">
                <ul>
                  {filterOptions[selectedCategory]?.filter((opt) =>
                    opt.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((opt) => (
                    <li
                      key={opt}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                      onClick={() => setSelectedFilter(opt)}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="p-2">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-700">{selectedCategory} &gt; {selectedFilter}</span>
                <FiTrash className="text-gray-500 cursor-pointer" onClick={() => setSelectedFilter(null)} />
              </div>
              <div className="p-2 border rounded-md mt-2">
                <span className="text-gray-500">is</span>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Select Value"
                    className="w-full p-2 border rounded-md cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                    readOnly
                  />
                </div>
              </div>
              <div className="mt-2 p-2 border rounded-md">
                <div className="flex items-center p-2 border-b">
                  <FiSearch className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full ml-2 outline-none"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <ul>
                  <li className="p-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedValues.length === characterOptions.length}
                      onChange={() =>
                        setSelectedValues(
                          selectedValues.length === characterOptions.length ? [] : characterOptions
                        )
                      }
                    />
                    Select all
                  </li>
                  {characterOptions.filter((opt) =>
                    opt.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((opt) => (
                    <li key={opt} className="p-2 flex items-center gap-2 cursor-pointer" onClick={() => toggleValue(opt)}>
                      <input type="checkbox" checked={selectedValues.includes(opt)} readOnly />
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className="w-full mt-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                onClick={applyFilters}
              >
                Apply ({selectedValues.length})
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default FilterDropdown;
