import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
// import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FiRefreshCw, FiSearch } from "react-icons/fi";

interface Product {
    category: string;
}

interface FetchResponse {
    products: Product[];
}

const Sidebar = () => {
    const {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        setKeyword,
        keyword: activeKeyword,
        isSidebarOpen,
        toggleSidebar
    } = useFilter();

    const [categories, setCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [keywords] = useState<string[]>([
        "apple",
        "watch",
        "Fashion",
        "trend",
        "shoes"
    ]);

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("https://dummyjson.com/products");
                const data: FetchResponse = await response.json();

                const uniqueCategories = Array.from(
                    new Set(data.products.map((product) => product.category))
                );

                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching categories", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMinPrice(value ? parseFloat(value) : undefined);
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxPrice(value ? parseFloat(value) : undefined);
    };

    const handleRadioChangeCategories = (category: string) => {
        setSelectedCategory(category);
    };

    const handleKeywordClick = (keyword: string) => {
        setKeyword(keyword);
    };

    const handleResetFilters = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setKeyword("");
    };

    return (
        <>
            {/* 1. MOBILE OVERLAY (BACKDROP WITH BLUR):*/}
            {isSidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 sm:hidden transition-opacity duration-300"
                />
            )}

            {/* 2. SIDEBAR CONTAINER:*/}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-72 bg-white p-6 h-screen overflow-y-auto border-r border-gray-200 transition-transform duration-300 ease-in-out sm:relative sm:w-64 sm:translate-x-0 sm:block shadow-xl sm:shadow-none ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
                    }`}
            >
                {/* Header ya Sidebar */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-extrabold text-slate-900">
                        React Store
                    </h1>

                    <button
                        onClick={toggleSidebar}
                        className="p-1 rounded-lg text-gray-500 hover:bg-gray-100 sm:hidden cursor-pointer"
                    >
                        <IoMdClose size={22} />
                    </button>
                </div>

                <div className="space-y-6">

                    <div>
                        <label className="text-lg font-bold text-slate-900 uppercase tracking-wider block mb-2">
                            Search
                        </label>
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500" size={16} />
                            <input
                                type="text"
                                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-pink-500 rounded-xl outline-none focus:bg-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-pink-500"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* 4. PRICE RANGE INPUTS */}
                    <div>
                        <label className="text-lg font-bold text-slate-900 uppercase tracking-wider block mb-2">
                            Price Range ($)
                        </label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="number"
                                className="w-1/2 px-3 py-2 text-sm bg-gray-50 border border-pink-500 rounded-xl outline-none focus:bg-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-pink-500"
                                placeholder="Min"
                                value={minPrice ?? ""}
                                onChange={handleMinPriceChange}
                            />
                            <span className="text-gray-400 font-bold">-</span>
                            <input
                                type="number"
                                className="w-1/2 px-3 py-2 text-sm bg-gray-50 border border-pink-500 rounded-xl outline-none focus:bg-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-pink-500"
                                placeholder="Max"
                                value={maxPrice ?? ""}
                                onChange={handleMaxPriceChange}
                            />
                        </div>
                    </div>

                    {/* 5. CATEGORIES SECTION */}
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 uppercase block mb-3">
                            Categories
                        </h2>
                        {isLoading ? (
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4"></div>
                                <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2"></div>
                                <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3"></div>
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                                {categories.map((category, index) => (
                                    <label
                                        key={index}
                                        className={`flex items-center p-2 rounded-lg cursor-pointer text-xs font-medium transition-colors ${selectedCategory === category
                                            ? "bg-pink-500 text-white font-semibold"
                                            : "text-slate-500  hover:bg-gray-200"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="category"
                                            value={category}
                                            onChange={() => handleRadioChangeCategories(category)}
                                            className="mr-3 w-4 h-4 accent-pink-500 cursor-pointer"
                                            checked={selectedCategory === category}
                                        />
                                        <span className="capitalize">{category}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 6. KEYWORDS SECTION */}
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 uppercase block mb-3">
                            Popular Keywords
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {keywords.map((keyword, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleKeywordClick(keyword)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all cursor-pointer ${activeKeyword === keyword
                                        ? "bg-black text-white shadow-sm"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {keyword}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 7. RESET BUTTON */}
                    <button
                        onClick={handleResetFilters}
                        className="w-full py-2.5 px-4 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-4"
                    >
                        <FiRefreshCw size={14} />
                        Reset Filters
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;