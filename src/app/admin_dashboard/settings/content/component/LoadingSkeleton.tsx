const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-[40px] w-[200px] bg-gray-200 rounded mb-4" />
      <div className="flex gap-8">
        <div className="w-[420px] h-[320px] bg-gray-200 rounded" />
        <div className="space-y-4">
          <div className="h-[40px] w-[323px] bg-gray-200 rounded" />
          <div className="h-[40px] w-[323px] bg-gray-200 rounded" />
          <div className="h-[40px] w-[323px] bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
