import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts, fetchPostsPagination } from "../api/api";
import { useState } from "react";
import { NavLink } from "react-router";

const FetchRQ = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  //with the query
  // const { data, isError, isPending, error } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: fetchPosts,
  //   // gcTime : 10000,
  //   // staleTime:10000,
  //   // refetchInterval: 1000,
  //   // refetchIntervalInBackground: true,
  // });

  // for pagination
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: () => fetchPostsPagination(pageNumber),
    // gcTime : 10000,
    // staleTime:10000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
  });

  const toggleAccordion = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p> {error.message || "Something went wrong"} </p>;

  /*
  gcTime -(Garbage Collection Time)
In React Query v5, the cache Time option in React Query has been renamed to gcTime.
When you use React Query to get data, it saves the results in a local cache. This means if you ask for the same data again, React Query will give you the saved data instead of making another API request. The cache updates automatically if the data changes, so you always get the latest information.
Use Case: Imagine you're fetching a list of users. If you go back to the same page, React Query will show the saved list from the cache instead of reloading it from the server, making your app faster. If a new user is added, React Query will automatical update the list.
By default, inactive queries are garbage collected after 5 minutes. This means that i query is not being used for 5 minutes, the cache for that query will be cleaned up.
  */

  /* staleTime 
staleTime
In React Query, stale Time is a configuration option that determines how long fetched data is considered fresh before it needs to be refetched.
Here's how it works:
Fresh Data:
When data is initially fetched or updated, it's considered fresh.
Stale Data:
After the stale Time duration (specified in milliseconds) elapses, the data is considered
Default Value:
The default staleTime is 0, meaning data becomes stale immediately after being fe This ensures data is always up-to-date but can lead to frequent refetching.

*/

  /*
pooling
Polling
In React Query, polling refers to the technique of fetching data from an API at regular intervals to keep the Ul up-to-date with the latest information. This is especially useful for scenarios where data changes frequently and you want to display real-time updates without requiring the user to manually refresh the page.
`refetchInterval option: The simplest way to enable polling is to pass the 'refetchInterval option to the 'useQuery hook. This option specifies the interval (in milliseconds) at which React Query should automatically refetch the data.
// When you want to fetch the data even in background or you are in another tab.
refetchintervalin Background option: If you want to continue polling even when the component is not mounted, you can use the 'refetchintervalin Background option.
*/

  /*
useMutation
The use Mutation hook is part of React Query and is used for operations that modify data, like Create, Update, and Delete (CRUD operations).
Syntax:
const mutation = useMutation( mutationFn, {
// Optional configuration options
});
We can provide various configuration options to customize the behavior of the mutation, such as:
onSuccess: A callback function that runs when the mutation is successful.
onError
: A callback function that runs if the mutation fails.
onSettled: A callback function that runs regardless of success or failure.
mutationKey: A unique key to identify the mutation in the cache.

*/

  return (
    <div className="w-full max-w-4xl mx-auto my-12 bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm font-sans">
      <h1 className="flex items-center justify-center text-4xl font-bold mb-5">
        REACT QUERY
      </h1>
      <ul className="space-y-4">
        {data?.map((curr) => {
          const isExpanded = expandedId === curr.id;
          return (
            <li
              key={curr.id}
              className="bg-[#e5e7eb] rounded-xl overflow-hidden shadow-sm text-gray-900"
            >
              <NavLink to={`/rq/${curr.id}`}>
                <button
                  onClick={() => toggleAccordion(curr.id)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left"
                >
                  <span className="text-xl font-medium text-gray-800">
                    {curr.title}
                  </span>
                  <span className="text-gray-600 transition-transform duration-300">
                    {isExpanded ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </span>
                </button>
                {isExpanded && (
                  <div className="px-6 py-5 border-t border-gray-300 text-gray-800 bg-[#e5e7eb]">
                    <p className="text-lg leading-relaxed">{curr.body}</p>
                  </div>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>

      <div className="flex gap-4 items-center mt-10 justify-center">
        <button
          disabled={pageNumber === 0}
          onClick={() => setPageNumber((prev) => Math.max(0, prev - 3))}
          className="bg-white border border-gray-300 px-6 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm font-medium"
        >
          PREV
        </button>
        <p className="text-gray-800 text-lg bg-[#e5e7eb] border border-gray-300 shadow-sm px-6 py-2.5 rounded-lg font-bold">
          {pageNumber / 3 + 1}
        </p>
        <button
          onClick={() => setPageNumber((prev) => prev + 3)}
          className="bg-white border border-gray-300 px-6 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors shadow-sm font-medium"
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default FetchRQ;
