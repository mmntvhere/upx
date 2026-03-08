import React from "react"

const SkeletonBlock = ({ height = "h-6", width = "w-full", rounded = "rounded" }) => (
  <div className={`bg-[#2c2c2c] animate-pulse ${height} ${width} ${rounded}`}></div>
)

const SitePageSkeleton = () => {
  return (
    <main className="bg-[#141415] min-h-screen text-white pb-10 relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">

        <SkeletonBlock height="h-4" width="w-1/3" />
        <SkeletonBlock height="h-[300px]" rounded="rounded-xl" />
        <SkeletonBlock height="h-4" width="w-1/2" />
        <SkeletonBlock height="h-6" width="w-2/3" />
        <SkeletonBlock height="h-5" width="w-1/3" />
        <SkeletonBlock height="h-[120px]" rounded="rounded-xl" />

      </div>
    </main>
  )
}

export default SitePageSkeleton