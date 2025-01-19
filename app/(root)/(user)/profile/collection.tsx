import React from "react";

const CollectedPage: React.FC = () => {
  return (
    <>
      {/* Filters Section */}
      {/* <div className="mt-6 flex px-4">
        <div className="flex flex-wrap justify-center space-x-2">
          <button className="flex items-center space-x-2 rounded-md border px-4 py-2 hover:bg-gray-100">
            <i className="fas fa-filter"></i>
            <span>Status</span>
            <i className="fas fa-caret-down"></i>
          </button>
          <button className="flex items-center space-x-2 rounded-md border px-4 py-2 hover:bg-gray-100">
            <span>Chains</span>
            <i className="fas fa-caret-down"></i>
          </button>
          <input
            type="text"
            placeholder="Search by name"
            className="rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="flex items-center space-x-2 rounded-md border px-4 py-2 hover:bg-gray-100">
            <span>Recently received</span>
            <i className="fas fa-caret-down"></i>
          </button>
          <button className="rounded-md border px-4 py-2 hover:bg-gray-100">
            <i className="fas fa-list"></i>
          </button>
          <button className="rounded-md border px-4 py-2 hover:bg-gray-100">
            <i className="fas fa-th"></i>
          </button>
        </div>
      </div> */}

      <div className="h-48 rounded-lg border-2 border-gray-200 py-6 text-lg">
        <p className="text-gray-500">0 items</p>
        <div className="mt-4">
          <p className="text-gray-500">No items found for this search</p>
          <button className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Back to all items
          </button>
        </div>
      </div>
    </>
  );
};

export default CollectedPage;
