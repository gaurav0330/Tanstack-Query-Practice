import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./components/layouts/MainLayout";
import { Home } from "./pages/Home";
import FetchOld from "./pages/FetchOld";
import FetchRq from "./pages/FetchRq";
import { QueryClientProvider ,QueryClient} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FetchIndv } from "./components/UI/FetchIndv";
import FetchInfinite from "./pages/FetchInfinite";
import FetchInfiniteObserver from "./pages/FetchInfiniteObserver";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/trad", element: <FetchOld /> },
      { path: "/rq", element: <FetchRq /> },
      { path: "/rq/:id", element: <FetchIndv /> },
      { path: "/infinite", element: <FetchInfinite /> },
      { path: "/infinite-observer", element: <FetchInfiniteObserver /> },
    ],
  },
]);

// In React Query, the Query ClientProvider is a crucial component that
// provides a QueryClient instance to your React application.
//  This Query Client is responsible for managing all the data fetching,
//  caching, and state management related to your queries.


// QueryClient ==>  it manages the caching backgorund fetching , data sychronization and other query-realted logic
// It provides a centrilzied state for managing and caching asynchronus data in your application.


// new QueryClient ==> This create a new QueryClient insatnce with deafult setting
// ==> you can configure it with options if needed (eg. Setting cachetime , satet time , etc)

// QueryClientProvider ==> this component is part of reat query and is used to provide the 
// queryclient instace to your entire app this makes the query client available via ract context api so that 
// all the components in the tree can useQuery,useMutation and other hooks proviede by react query
 
  
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
