export const ItemsSkeleton = () => {
  return (
    <div className="flex flex-col justify-center ">
      <div className="px-6 lg:px-2 md:pb-8 bg-background relative">
        <div className=" gap-2 items-center cursor-pointer justify-end hidden lg:flex">
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full justify-between overflow-y-auto px-6 lg:px-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div
            key={item}
            className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center gap-4 w-full max-w-[390px] h-fit pb-[22px] animate-pulse"
          >
            <div className="w-full h-[400px] bg-gray-200 rounded" />
            <div className="flex flex-col text-start w-full items-start gap-2">
              <div className="h-6 w-3/4 bg-gray-200 rounded" />
              <div className="h-6 w-1/3 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
