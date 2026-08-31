import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ProductPage from "./components/ProductPage";
import TopSellers from "./components/TopSellers";
import PopularBlogs from "./components/PopularBlogs";


export default function App() {
  return (
    <Router>
      <div className="flex h-screen">

        <Sidebar />
        <div className="flex flex-col sm:flex-col xl:flex-row">
          <div className="h-[886px] flex justify-center items-center">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </div>
          <div className="flex flex-col items-center">
            <TopSellers />
            <PopularBlogs />
          </div>
        </div>
      </div>
    </Router>
  )
}