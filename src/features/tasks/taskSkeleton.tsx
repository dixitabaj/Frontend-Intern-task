export default function TaskSkeleton() {
  return (
    <div className="pb-2">
      {/* Fake table header */}
      <div className="border-y border-gray-100 bg-gray-50 px-4 py-3 flex gap-4">
        <div className="h-3 w-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 flex-1 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse hidden md:block" />
        <div className="h-3 w-12 bg-gray-200 rounded animate-pulse hidden lg:block" />
        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Fake rows */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-4 py-3.5 border-b border-gray-100"
          style={{ opacity: 1 - i * 0.07 }}
        >
          <div className="h-3 w-4 bg-gray-100 rounded animate-pulse" />
          <div className="h-3 flex-1 bg-gray-100 rounded animate-pulse" />
          <div className="h-5 w-20 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-5 w-14 bg-gray-100 rounded-full animate-pulse hidden md:block" />
          <div className="h-3 w-10 bg-gray-100 rounded animate-pulse hidden lg:block" />
          <div className="flex gap-1.5">
            <div className="h-6 w-12 bg-gray-100 rounded-md animate-pulse" />
            <div className="h-6 w-10 bg-gray-100 rounded-md animate-pulse" />
            <div className="h-6 w-14 bg-gray-100 rounded-md animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}