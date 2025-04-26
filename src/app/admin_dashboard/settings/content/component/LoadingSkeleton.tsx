import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-2 mb-12">
        <div className="w-4 h-4 bg-gray-200 rounded"></div>
        <div className="h-6 w-24 bg-gray-200 rounded"></div>
      </div>

      {/* Content Section */}
      <div className="mt-12">
        <div className="h-6 w-20 bg-gray-200 rounded mb-1"></div>
        <div className="h-4 w-64 bg-gray-200 rounded mb-8"></div>

        {/* Image and Settings Grid */}
        <div className="flex gap-8">
          {/* Image Section */}
          <div>
            <div className="h-4 w-16 bg-gray-200 rounded mb-2"></div>
            <div className="w-[420px] h-[320px] bg-gray-200 rounded"></div>
          </div>

          {/* Settings Section */}
          <div className="space-y-6">
            {/* Color Selection */}
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="flex gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-gray-200 rounded-full"></div>
                ))}
              </div>
            </div>

            {/* Input Fields */}
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="w-[323px] h-[40px] bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="mt-12">
        <div className="h-6 w-20 bg-gray-200 rounded mb-1"></div>
        <div className="h-4 w-64 bg-gray-200 rounded mb-4"></div>
        <div className="w-full h-[337px] bg-gray-200 rounded mb-4"></div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <div className="w-[153.3px] h-[40px] bg-gray-200 rounded-full"></div>
        <div className="w-[153.3px] h-[40px] bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
