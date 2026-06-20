import { Link } from "react-router";

export const Home = () => {
  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-6 font-sans">
      <div className="text-center space-y-6 bg-gray-50 border border-gray-200 rounded-3xl p-12 shadow-sm">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          Mastering <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">TanStack Query</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          A comprehensive demonstration of data fetching in React. Compare traditional `useEffect` approaches with the power, caching, and simplicity of React Query.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <Link to="/trad" className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition-colors shadow-sm">
            Traditional Fetch
          </Link>
          <Link to="/rq" className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors shadow-sm">
            React Query Fetch
          </Link>
          <Link to="/infinite" className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl transition-colors shadow-sm">
            Infinite Scroll
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <FeatureCard 
          title="Caching & Stale Time" 
          description="Experience lightning-fast UI responses. React Query caches your data and magically manages background updates so your users never see a loading spinner twice."
          icon="⚡"
        />
        <FeatureCard 
          title="Mutations & Updates" 
          description="Easily Create, Update, and Delete data. Watch as the UI instantly reflects changes using Query Invalidation."
          icon="🔄"
        />
        <FeatureCard 
          title="Pagination & Infinite" 
          description="Handle massive datasets effortlessly. Built-in support for paginated queries and infinite scrolling capabilities right out of the box."
          icon="📚"
        />
      </div>

      {/* Codebase Map & Comparison Section */}
      <div className="mt-16 space-y-12">
        {/* Comparison */}
        <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">Traditional vs React Query</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-red-500 mb-3">Traditional (useEffect)</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2"><span>❌</span> <span>Requires manual `useState` for tracking data, loading, and error states.</span></li>
                <li className="flex items-start gap-2"><span>❌</span> <span>No built-in caching; re-fetches every single time you navigate back to the page.</span></li>
                <li className="flex items-start gap-2"><span>❌</span> <span>Boilerplate-heavy and prone to race conditions if not carefully managed.</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-indigo-500 mb-3">React Query</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2"><span>✅</span> <span>A single line `useQuery` provides your data, `isPending`, and `isError` seamlessly.</span></li>
                <li className="flex items-start gap-2"><span>✅</span> <span>Powerful Caching using `staleTime` and `gcTime` prevents redundant network fetches.</span></li>
                <li className="flex items-start gap-2"><span>✅</span> <span>Built-in support for Retries, Polling (`refetchInterval`), and Optimistic Updates via Mutations.</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Codebase Map */}
        <div className="bg-gray-900 text-white rounded-3xl p-10 shadow-md">
          <h2 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-4">Codebase Explorer Map</h2>
          <p className="text-gray-300 mb-6 text-lg">Wondering where to find specific concepts? Look inside these files:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CodeMapItem file="src/pages/FetchOld.jsx" desc="Baseline useEffect and useState implementation." />
            <CodeMapItem file="src/pages/FetchRq.jsx" desc="useQuery, useMutation, and Optimistic UI Updates via setQueryData." />
            <CodeMapItem file="src/pages/FetchInfinite.jsx" desc="useInfiniteQuery with a native window scroll event listener." />
            <CodeMapItem file="src/pages/FetchInfiniteObserver.jsx" desc="useInfiniteQuery optimized with react-intersection-observer for maximum performance." />
            <CodeMapItem file="src/api/api.jsx" desc="Centralized Axios instance for all HTTP requests." />
          </div>
        </div>

        {/* Resources & DevTools */}
        <div className="bg-blue-50 border border-blue-200 rounded-3xl p-10 shadow-sm text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">TanStack DevTools & Resources</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Make sure to check out the official TanStack React Query DevTools! It allows you to visualize all the queries, mutations, and cache states happening under the hood in real-time. It's a game changer for debugging.
          </p>
          <a 
            href="https://tanstack.com/query/latest/docs/framework/react/overview" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
          >
            Read Official Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-[#e5e7eb] rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-700 leading-relaxed">{description}</p>
  </div>
);

const CodeMapItem = ({ file, desc }) => (
  <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 hover:border-gray-500 transition-colors">
    <h4 className="text-blue-400 font-mono text-sm mb-2">{file}</h4>
    <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
  </div>
);
