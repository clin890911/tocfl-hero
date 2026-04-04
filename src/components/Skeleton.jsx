/**
 * Reusable skeleton loading components
 */

export const SkeletonPulse = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

export const SkeletonCard = () => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-pulse">
    <SkeletonPulse className="w-12 h-12 rounded-lg mb-4" />
    <SkeletonPulse className="h-4 w-24 mb-2" />
    <SkeletonPulse className="h-8 w-16" />
  </div>
);

export const SkeletonStatsGrid = ({ cols = 4 }) => (
  <div className={`grid grid-cols-2 sm:grid-cols-${cols} gap-4`}>
    {Array.from({ length: cols }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <SkeletonPulse
        key={i}
        className={`h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
      />
    ))}
  </div>
);

export const SkeletonPage = ({ title = true }) => (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-4xl mx-auto animate-pulse">
      {title && <SkeletonPulse className="h-8 w-48 mb-8" />}
      <SkeletonStatsGrid cols={4} />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <SkeletonPulse className="h-6 w-32 mb-4" />
          <SkeletonText lines={4} />
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <SkeletonPulse className="h-6 w-32 mb-4" />
          <SkeletonText lines={4} />
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonPulse;
