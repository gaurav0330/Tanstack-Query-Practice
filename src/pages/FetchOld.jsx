import { useEffect, useState } from "react"
import { fetchPostsOld } from "../api/api";

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
        <h1 className="flex items-center justify-center text-4xl font-bold mb-5">OLD WAY TO FETCH</h1>
           
            <ul className="space-y-4">
                {posts.map((curr) => {
                    const isExpanded = expandedId === curr.id;
                    return (
                        <li key={curr.id} className="bg-[#e5e7eb] rounded-xl overflow-hidden shadow-sm text-gray-900">
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
                                <div className="px-6 py-5 border-t border-gray-300 text-gray-800 bg-[#e5e7eb]">
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