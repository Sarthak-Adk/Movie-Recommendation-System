export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl bg-zinc-900"
        >
          <div className="aspect-[2/3] animate-pulse bg-zinc-800" />
          <div className="space-y-2 p-4">
            <div className="h-4 animate-pulse rounded bg-zinc-800" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
