/*
  ALGORITHM & CONCEPTS: Infinite Scroll (Intersection Observer)
  1. Use `useInfiniteQuery` just like the native infinite scroll page.
  2. Import `useInView` from `react-intersection-observer` to replace the window scroll listener.
  3. Place an invisible `div` at the very bottom of the page and attach the `ref` from `useInView` to it.
  4. When the user scrolls down and the invisible `div` enters the viewport, `inView` becomes true.
  5. A simple `useEffect` watches `inView` and automatically calls `fetchNextPage()`!
  
  Note: This is drastically more performant because we aren't firing hundreds of scroll events per second.
*/

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/api";
import { useEffect } from "react";
import { Tooltip } from "../components/UI/Tooltip";
import { useInView } from "react-intersection-observer";

const FetchInfiniteObserver = () => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["users-observer"], // Separate key to avoid cache clashes when toggling pages
    queryFn: fetchUsers,
    initialPageParam: 1, // Required in React Query v5
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
  });

  const { ref, inView } = useInView({
    threshold: 1, 
    rootMargin: "100px", // Trigger when the user is within 100px of the bottom
  });

  useEffect(() => {
    // If the invisible div comes into view, and there are more pages, fetch them!
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) return <p className="text-center my-12 text-gray-600 text-lg">Loading...</p>;
  if (isError) return <p className="text-center my-12 text-red-500 text-lg">Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div className="w-full max-w-4xl mx-auto my-12 bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm font-sans">
      <div className="flex items-center justify-center gap-3 mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Infinite Scroll (Observer)
        </h1>
        <Tooltip position="bottom" content={
          <div className="space-y-2 text-left min-w-[280px]">
            <p><strong>useInView:</strong> A hook from `react-intersection-observer`.</p>
            <p><strong>How it works:</strong> We attach a `ref` to an invisible div at the bottom of the list. When that element enters the viewport, `inView` turns true, and we trigger `fetchNextPage()`!</p>
            <p><strong>Performance:</strong> This is drastically more performant than attaching a global `window` scroll listener.</p>
          </div>
        }>
          <span className="text-gray-400 hover:text-blue-500 cursor-help transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </Tooltip>
      </div>

      <ul className="space-y-4 mb-8">
        {data?.pages?.map((page, pageIndex) =>
          page.map((curr) => (
            <li
              key={curr.id}
              className="bg-[#e5e7eb] rounded-xl shadow-sm text-gray-900 px-6 py-5 flex flex-col hover:shadow-md transition-all relative"
            >
              <span className="text-lg font-bold text-gray-400 mb-1">
                #{curr.id}
              </span>
              <span className="text-xl font-medium text-gray-800">
                {curr.title}
              </span>
            </li>
          ))
        )}
      </ul>

      {/* The invisible intersection observer element */}
      <div ref={ref} className="h-10 w-full flex justify-center items-center py-4">
        {isFetchingNextPage && <p className="text-indigo-500 font-medium">Loading more data...</p>}
        {!hasNextPage && <p className="text-gray-500 font-medium">Nothing more to load</p>}
      </div>
    </div>
  );
};

export default FetchInfiniteObserver;
