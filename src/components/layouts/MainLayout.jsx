
import { Outlet } from "react-router";
import Header from "../Header";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
