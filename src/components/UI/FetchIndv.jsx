
import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router";
import { fetchPostIndv } from "../../api/api";


export const FetchIndv = () => {
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["post", id], // useState
    queryFn: () => fetchPostIndv(id), // useEffect
  });

  if (isPending) return <p className="text-center my-12 text-gray-600 text-lg">Loading...</p>;
  if (isError) return <p className="text-center my-12 text-red-500 text-lg"> Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div className="w-full max-w-4xl mx-auto my-12 bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm font-sans">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Post Details <span className="text-gray-400">#{data.id}</span></h2>
        <NavLink to="/rq">
          <button className="px-5 py-2.5 bg-[#e5e7eb] hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Go Back
          </button>
        </NavLink>
      </div>
      
      <div className="bg-[#e5e7eb] rounded-xl overflow-hidden shadow-sm text-gray-900">
        <div className="px-6 py-5 border-b border-gray-300">
          <h3 className="text-xl font-medium text-gray-800">{data.title}</h3>
        </div>
        <div className="px-6 py-6 bg-[#f3f4f6]">
          <p className="text-lg leading-relaxed text-gray-700">{data.body}</p>
        </div>
      </div>
    </div>
  );
};