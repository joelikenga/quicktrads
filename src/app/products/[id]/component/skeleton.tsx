export const ProductSkeleton = () => {
  return (
    <div className="px-4 md:px-10 mt-[100px] md:mt-[150px] animate-pulse">
      <div className="mx-auto max-w-7xl w-full">
        {/* Back button skeleton */}
        <div className="w-fit h-full items-center flex justify-between gap-2 pb-4">
          <div className="h-6 w-6 bg-gray-200 rounded" />
          <div className="h-6 w-20 bg-gray-200 rounded" />
        </div>

        <div className="w-full flex flex-col md:flex-row justify-start gap-8">
          {/* Image skeleton */}
          <div className="w-full h-full flex flex-col-reverse md:flex-row justify-between gap-6">
            {/* Thumbnail skeletons */}
            <div className="flex md:flex-col gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="w-[100px] h-[120px] bg-gray-200 rounded"
                />
              ))}
            </div>

            {/* Main image skeleton */}
            <div className="h-fit relative w-full max-w-[520px]">
              <div className="w-full  h-[620px] bg-gray-200 rounded" />
            </div>
          </div>

          {/* Details skeleton */}
          <div className="w-full max-w-[504px] h-fit flex flex-col gap-6">
            {/* Title and price */}
            <div className="flex flex-col gap-4">
              <div className="h-7 w-3/4 bg-gray-200 rounded" />
              <div className="h-6 w-1/4 bg-gray-200 rounded" />
            </div>

            {/* Size selection */}
            <div className="flex flex-col gap-4">
              <div className="h-5 w-1/4 bg-gray-200 rounded" />
              <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="col-span-2 md:col-span-1 h-[60px] w-full bg-gray-200 rounded"
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-6">
              <div className="h-12 w-full bg-gray-200 rounded-full" />
              <div className="h-12 w-full bg-gray-200 rounded-full" />
            </div>

            {/* Section skeletons */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex flex-col gap-4">
                <div className="h-6 w-1/3 bg-gray-200 rounded" />
                <div className="h-20 w-full bg-gray-200 rounded" />
              </div>
            ))}

            {/* Share section */}
            <div className="flex flex-col gap-4">
              <div className="h-6 w-1/4 bg-gray-200 rounded" />
              <div className="flex flex-wrap gap-12">
                <div className="h-5 w-20 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
