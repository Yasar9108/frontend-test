import { FiFilter } from "react-icons/fi";
import FilterComponent from "./components/FilterComponent";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center w-full p-6">
      {/* Header Section - Logo, Company Name & Tagline */}
      <div className="flex items-center w-full max-w-3xl mb-6">
        {/* Small Logo */}
        <img
          src="https://segwise.ai/opengraph-image.png?ae356eb24c0099ff"
          alt="Company Logo"
          className="w-8 h-8 mr-3" // Added margin-right for spacing
        />

        {/* Company Name & Tagline */}
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-gray-900">Segwise</h1>
          <span className="text-gray-500 text-sm font-medium">Front End Test</span>
        </div>
      </div>

      {/* ✅ Dotted Rectangular Box (Wrapper for FilterComponent) */}
      <div className="w-full max-w-3xl p-6 border-dashed border-2 border-gray-400 rounded-lg flex justify-center items-center">
        {/* 🔸 Smaller Inner Box (Centered, Gray Background) */}
        <div className="w-full max-w-md p-4 bg-gray-200 rounded-lg shadow-md">
          <FilterComponent />
        </div>
      </div>

      {/* Instructions Section */}
      <div className="mt-4 text-left w-full max-w-3xl">
        <h2 className="font-semibold text-gray-800">Instructions</h2>
        <ul className="text-gray-600 list-disc pl-5 mt-2">
          <li>User should be able to add multiple filters</li>
          <li>Various states including hover and focus provided to the right</li>
          <li>Click on the link(button) placed above to play prototype</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
