/*
  ALGORITHM & CONCEPTS: Infinite Scroll (Native Window Listener)
  1. Use `useInfiniteQuery` instead of `useQuery`.
  2. Provide `initialPageParam` (usually 1) and a `getNextPageParam` function to determine how to increment pages.
  3. The `data.pages` object returns an array of arrays (each page of data). We map over both to render the list.
  4. Use a native `useEffect` window scroll listener to detect when the user hits the bottom of the page (`scrollHeight - scrollTop === clientHeight`).
  5. Call `fetchNextPage()` when the bottom is reached.
*/

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/api";
import { useEffect } from "react";
import { Tooltip } from "../components/UI/Tooltip";

const FetchInfinite = () => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    initialPageParam: 1, // Required in React Query v5
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the page (with a 50px buffer)
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50
      ) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Clean up the event listener when component unmounts
    return () => window.removeEventListener("scroll", handleScroll);

  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  
  if (isPending) return <p className="text-center my-12 text-gray-600 text-lg">Loading...</p>;
  if (isError) return <p className="text-center my-12 text-red-500 text-lg">Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div className="w-full max-w-4xl mx-auto my-12 bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm font-sans">
      <div className="flex items-center justify-center gap-3 mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Infinite Scroll
        </h1>
        <Tooltip position="bottom" content={
          <div className="space-y-2 text-left min-w-[280px]">
            <p><strong>useInfiniteQuery:</strong> Ideal for loading massive datasets chunk by chunk.</p>
            <p><strong>getNextPageParam:</strong> Returns the next page index. If it returns undefined, `hasNextPage` becomes false.</p>
            <p><strong>Scroll Listener:</strong> We attached a custom useEffect listener to trigger `fetchNextPage()` when hitting the bottom!</p>
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
        {data?.pages?.map((page) =>
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

      <div className="flex justify-center mt-6">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-8 py-3 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
};

export default FetchInfinite;