import React, { useState } from "react";
import { motion } from "framer-motion";

const categories = [
  "All Videos",
  "Tech",
  "Food",
  "Cosmetic",
  "Scent",
  "Fashion",
  "Drinks",
];

export default function VideoCategoryTabs() {
  const [activeTab, setActiveTab] = useState("All Videos");

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 min-w-max">
          {categories.map((category) => {
            const isActive = activeTab === category;

            return (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`relative px-5 py-3 rounded-2xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "text-white bg-black shadow-lg"
                    : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-2xl bg-black -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
          >
            <div className="h-48 bg-gray-200" />
            <div className="p-4">
              <span className="inline-block px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600 mb-3">
                {activeTab}
              </span>
              <h3 className="text-lg font-semibold text-gray-900">
                Sample {activeTab} Video {item}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Video content preview for the {activeTab.toLowerCase()} category.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
