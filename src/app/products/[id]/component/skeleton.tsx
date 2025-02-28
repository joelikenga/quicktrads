export const ProductSkeleton = () => {
  return (
    <div className="px-10 mt-[150px] animate-pulse">
      <div className="mx-auto max-w-7xl w-full">
        <div className="w-full flex justify-start gap-8">
          {/* Image skeleton */}
          <div className="w-fit h-full flex justify-between gap-6">
            {/* Thumbnail skeletons */}
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="w-[100px] h-[120px] bg-gray-200 rounded"
                />
              ))}
            </div>

            {/* Main image skeleton */}
            <div className="w-[420px] h-[620px] bg-gray-200 rounded" />
          </div>

          {/* Details skeleton */}
          <div className="w-[504px] h-fit flex flex-col gap-6">
            {/* Title and price */}
            <div className="flex flex-col gap-4">
              <div className="h-7 w-3/4 bg-gray-200 rounded" />
              <div className="h-6 w-1/4 bg-gray-200 rounded" />
            </div>

            {/* Size selection */}
            <div className="flex flex-col gap-4">
              <div className="h-5 w-1/4 bg-gray-200 rounded" />
              <div className="grid grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="h-[60px] w-[88px] bg-gray-200 rounded"
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-6">
              <div className="h-12 w-full bg-gray-200 rounded-full" />
              <div className="h-12 w-full bg-gray-200 rounded-full" />
            </div>

            {/* Sections */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex flex-col gap-4">
                <div className="h-6 w-1/3 bg-gray-200 rounded" />
                <div className="h-20 w-full bg-gray-200 rounded" />
              </div>
            ))}

            {/* Share section */}
            <div className="flex flex-col gap-4">
              <div className="h-6 w-1/4 bg-gray-200 rounded" />
              <div className="flex gap-12">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-5 w-20 bg-gray-200 rounded"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
