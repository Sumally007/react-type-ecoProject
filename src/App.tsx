import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ProductPage from "./components/ProductPage";
import TopSellers from "./components/TopSellers";
import PopularBlogs from "./components/PopularBlogs";


export default function App() {
  return (
    <Router>
      <div className="flex bg-gray-50">

        <Sidebar />
        <div className="flex-1 flex justify-between flex-col xl:flex-row w-full">
          <div className="w-full maxw">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </div>
          <div className="flex flex-col items-center gap-4 p-4 w-full xl:w-auto xl:pl-0">
            <TopSellers />
            <PopularBlogs />
          </div>
        </div>
      </div>
    </Router>
  )
}