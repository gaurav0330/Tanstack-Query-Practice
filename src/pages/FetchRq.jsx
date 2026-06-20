/*
  ALGORITHM & CONCEPTS: React Query (TanStack Query)
  1. Import `useQuery` and `useMutation` from `@tanstack/react-query`.
  2. Querying: Call `useQuery` passing a unique `queryKey` and the `queryFn` (API call). 
     - React Query automatically handles `isPending`, `isError`, and `data` states.
     - Data is cached based on `gcTime` and background-refetched based on `staleTime`.
  3. Mutations: Call `useMutation` to handle Create/Update/Delete operations.
     - On success, we can use `queryClient.setQueryData` to optimistically update the UI without waiting for a refetch.
*/

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePost, fetchPosts, fetchPostsPagination, updatePost } from "../api/api";
import { useState } from "react";
import { NavLink } from "react-router";
import { Tooltip } from "../components/UI/Tooltip";

const FetchRQ = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  const queryClient = useQueryClient();

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

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["posts", pageNumber], (currEle) => {
        return currEle?.filter((post) => post.id !== id);
      });
    },
  });


const updateMutation =  useMutation(
    {
      mutationFn : (id) => updatePost(id),
      onSuccess : (data,id) => {
        queryClient.setQueryData(["posts", pageNumber],(postData)=>{
          return postData?.map((post)=>{
            return post.id === id ? {...post, title : data.data.title} : post;
          })
        });
      }
    }
  );


  const toggleAccordion = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  if (isPending) return <p className="text-center my-12 text-gray-600">Loading...</p>;
  if (isError) return <p className="text-center my-12 text-red-500"> {error.message || "Something went wrong"} </p>;

  return (
    <div className="w-full max-w-4xl mx-auto my-12 bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm font-sans">
      <div className="flex items-center justify-center gap-3 mb-5">
        <h1 className="text-4xl font-bold">
          REACT QUERY
        </h1>
        <Tooltip position="bottom" content={
          <div className="space-y-2 text-left min-w-[280px]">
            <p><strong>gcTime:</strong> How long inactive queries stay in memory before being garbage collected (default 5 mins).</p>
            <p><strong>staleTime:</strong> How long data is considered fresh before a background refetch is triggered (default 0).</p>
            <p><strong>Polling:</strong> Using `refetchInterval` to automatically fetch data at intervals.</p>
          </div>
        }>
          <span className="text-gray-400 hover:text-blue-500 cursor-help transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </Tooltip>
      </div>

      <ul className="space-y-4">
        {data?.map((curr) => {
          const isExpanded = expandedId === curr.id;
          return (
            <li
              key={curr.id}
              className="bg-[#e5e7eb] rounded-xl shadow-sm text-gray-900 flex flex-col transition-all duration-300 hover:shadow-md relative"
            >
              <div className="w-full px-6 py-4 flex flex-col md:flex-row justify-between items-center text-left gap-4">
                {/* Left Side: ID and Title (Click to navigate) */}
                <NavLink 
                  to={`/rq/${curr.id}`} 
                  className="flex-1 group"
                >
                  <span className="text-xl font-bold text-gray-400 mr-3 group-hover:text-blue-500 transition-colors">
                    #{curr.id}
                  </span>
                  <span className="text-xl font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                    {curr.title}
                  </span>
                </NavLink>

                {/* Right Side: Actions and Toggle */}
                <div className="flex items-center gap-3 shrink-0">
                  <Tooltip content="useMutation: Modifies data (CRUD). Cache is manually updated via setQueryData onSuccess." position="top">
                    <button 
                      onClick={() => updateMutation.mutate(curr.id)}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm font-semibold shadow-sm"
                    >
                      Update
                    </button>
                  </Tooltip>
                  <Tooltip content="mutate(): Executes the mutation. Automatically triggers onSuccess or onError handlers." position="top">
                    <button 
                      onClick={() => deleteMutation.mutate(curr.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold shadow-sm"
                    >
                      Delete
                    </button>
                  </Tooltip>
                  <button
                    onClick={() => toggleAccordion(curr.id)}
                    className="p-2 ml-2 text-gray-600 hover:bg-gray-300 rounded-full transition-colors"
                  >
                    {isExpanded ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="px-6 py-5 border-t border-gray-300 text-gray-800 bg-[#e5e7eb] rounded-b-xl">
                  <p className="text-lg leading-relaxed">{curr.body}</p>
                </div>
              )}
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
