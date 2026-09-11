import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
// import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FiRefreshCw, FiSearch } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import Button from "./Button";

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
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
                />
            )}

            {/* 2. SIDEBAR CONTAINER:*/}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-72 bg-white p-6 overflow-y-auto border-r border-gray-200 dark:border-zinc-800 transition-transform duration-300 ease-in-out md:relative md:w-64 md:translate-x-0 md:block shadow-xl md:shadow-none dark:bg-zinc-950 text-gray-900 dark:text-gray-100 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                {/* Header Sidebar */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        React Store
                    </h1>
                    <ThemeToggle />

                    <button
                        onClick={toggleSidebar}
                        className="p-1 rounded-lg text-gray-500 hover:bg-gray-100 md:hidden cursor-pointer"
                    >
                        <IoMdClose size={22} />
                    </button>
                </div>

                <div className="space-y-6">

                    {/* 3. SEARCH INPUT (Instagram Style) */}
                    <div className="lg:hidden">
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-2">
                            Search
                        </label>
                        <div className="relative">
                            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none" size={16} />
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 rounded-full border border-transparent focus:border-zinc-300 dark:focus:border-zinc-700 outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* 4. PRICE RANGE INPUTS (Instagram Style) */}
                    <div>
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-2">
                            Price Range ($)
                        </label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="number"
                                className="w-1/2 px-4 py-2.5 text-sm bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 rounded-full border border-transparent focus:border-zinc-300 dark:focus:border-zinc-700 outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                                placeholder="Min"
                                value={minPrice ?? ""}
                                onChange={handleMinPriceChange}
                            />
                            <span className="text-zinc-400 dark:text-zinc-600 font-bold">-</span>
                            <input
                                type="number"
                                className="w-1/2 px-4 py-2.5 text-sm bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 rounded-full border border-transparent focus:border-zinc-300 dark:focus:border-zinc-700 outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                                placeholder="Max"
                                value={maxPrice ?? ""}
                                onChange={handleMaxPriceChange}
                            />
                        </div>
                    </div>

                    {/* 5. CATEGORIES SECTION */}
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase block mb-3">
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
                                            : "text-slate-500 dark:text-gray-400  hover:bg-gray-200"
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
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase block mb-3">
                            Popular Keywords
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {keywords.map((keyword, index) => {
                                const isActive = activeKeyword === keyword;

                                return (
                                    <Button
                                        key={index}
                                        variant={isActive ? "primary" : "secondary"}
                                        onClick={() => handleKeywordClick(keyword)}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all ${isActive
                                            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                            }`}
                                    >
                                        {keyword}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 7. RESET BUTTON */}
                    <Button variant="primary"
                        onClick={handleResetFilters}
                        className="w-full py-2.5 px-4">
                        <FiRefreshCw size={14} />
                        Reset Filters
                    </Button>
                    {/* <button
                        onClick={handleResetFilters}
                        className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-4"
                    >
                        <FiRefreshCw size={14} />
                        Reset Filters
                    </button> */}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;