export const TableSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex w-full justify-start items-center gap-4 pb-12">
        <div className="h-8 w-[220px] bg-gray-200 rounded-full" />
        <div className="h-8 w-[100px] bg-gray-200 rounded-full" />
      </div>
      
      <div className="w-full border-t border-b lg:w-[1080px] border-stroke_weak">
        <div className="border-b border-stroke_weak h-11" />
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex items-center h-20 border-b border-stroke_weak">
            <div className="flex items-center gap-3 w-[192px] pl-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
            <div className="w-[230px] pl-4">
              <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-28 bg-gray-200 rounded" />
            </div>
            <div className="w-[120px] pl-4">
              <div className="h-4 w-12 bg-gray-200 rounded" />
            </div>
            <div className="w-[226px] pl-4">
              <div className="h-4 w-36 bg-gray-200 rounded" />
            </div>
            <div className="w-[150px] flex justify-center">
              <div className="h-6 w-24 bg-gray-200 rounded-full" />
            </div>
            <div className="w-[120px] flex justify-center gap-2">
              <div className="h-6 w-6 bg-gray-200 rounded" />
              <div className="h-6 w-6 bg-gray-200 rounded" />
              <div className="h-6 w-6 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
