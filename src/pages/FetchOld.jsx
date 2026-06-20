/*
  ALGORITHM & CONCEPTS: Traditional Data Fetching
  1. Define states for data (`posts`), loading (`isPending`), and errors (`isError`).
  2. Inside a `useEffect`, declare an async function `getPostData` to call the API.
  3. Set `isPending` to true before the fetch.
  4. Await the API call. If successful, set `posts` to the data and `isPending` to false.
  5. If an error is caught, set `isError` to true and handle the error.
  6. Return the UI based on these state values.
  
  Note: This lacks caching. Navigating away and back forces a completely new network request.
*/

import { useEffect, useState } from "react";
import { fetchPostsOld } from "../api/api";
import { Tooltip } from "../components/UI/Tooltip";

const FetchOld = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    

    useEffect(() => {

        const getPostsData = async () => {
            try {
                setIsLoading(true);
                setIsError(false);
                const res = await fetchPostsOld();
                if (res.status === 200) {
                    setPosts(res.data);
                setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
                setIsError(true);
            }
        };

        getPostsData();
    }, []);


    const [expandedId, setExpandedId] = useState(null);

    const toggleAccordion = (id) => {
        setExpandedId((prevId) => (prevId === id ? null : id));
    };

    if (isLoading) return <p>Loading...</p>
  if (isError) return <p> 'Something went wrong'</p>

    return (
        <div className="w-full max-w-4xl mx-auto my-12 bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm font-sans">
            <div className="flex items-center justify-center gap-3 mb-5">
                <h1 className="text-4xl font-bold">OLD WAY TO FETCH</h1>
                <Tooltip position="bottom" content={
                    <div className="space-y-2 text-left min-w-[280px]">
                        <p><strong>Traditional Fetching:</strong> Uses `useEffect` and `useState`.</p>
                        <p><strong>Pain Points:</strong> You have to manually track loading, error states, and it lacks automatic caching. Navigating away and back will cause a full network waterfall again.</p>
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
                {posts.map((curr) => {
                    const isExpanded = expandedId === curr.id;
                    return (
                        <li key={curr.id} className="bg-[#e5e7eb] rounded-xl shadow-sm text-gray-900 relative">
                            <button
                                onClick={() => toggleAccordion(curr.id)}
                                className="w-full px-6 py-5 flex justify-between items-center text-left"
                            >
                                <span className="text-xl font-medium text-gray-800">
                                    {curr.title}
                                </span>
                                <span className="text-gray-600 transition-transform duration-300">
                                    {isExpanded ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </span>
                            </button>
                            {isExpanded && (
                                <div className="px-6 py-5 border-t border-gray-300 text-gray-800 bg-[#e5e7eb] rounded-b-xl">
                                    <p className="text-lg leading-relaxed">{curr.body}</p>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default FetchOld