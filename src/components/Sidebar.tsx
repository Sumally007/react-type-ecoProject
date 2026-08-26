import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { MdMenu } from "react-icons/md";

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
        <div className={`${isSidebarOpen ? "block" : "hidden"} absolute w-64 bg-white sm:relative sm:w-64 sm:block p-5 h-screen z-20`}>
            <h1 className="flex justify-between items-center text-2xl font-bold mb-10 mt-4">
                React Store
                <MdMenu onClick={toggleSidebar} size={16} className="text-center sm:hidden cursor-pointer" />
            </h1>
            <section>
                <input
                    type="text"
                    className="outline-none border-2 w-full rounded px-2 sm:mb-0"
                    placeholder="Search Product"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="flex justify-center mt-3 items-center">
                    <input
                        type="text"
                        className="outline-none border-2 mr-2 p-5 py-3 mb-3 w-full"
                        placeholder="Min"
                        value={minPrice ?? ""}
                        onChange={handleMinPriceChange}
                    />
                    <input
                        type="text"
                        className="outline-none border-2 mr-2 px-5 py-3 mb-3 w-full"
                        placeholder="Max"
                        value={maxPrice ?? ""}
                        onChange={handleMaxPriceChange}
                    />
                </div>

                <section>
                    <h2 className="text-lg font-semibold mb-2">Categories</h2>
                    {isLoading ? (
                        <p className="text-gray-400 text-sm py-2">Loading categories...</p>
                    ) : (
                        categories.map((category, index) => (
                            <label key={index} className="block mb-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="category"
                                    value={category}
                                    onChange={() => handleRadioChangeCategories(category)}
                                    className="mr-2 w-[16px] h-[16px] cursor-pointer"
                                    checked={selectedCategory === category}
                                />
                                {category.toUpperCase()}
                            </label>
                        ))
                    )}
                </section>

                <div className="mb-5 mt-4">
                    <h2 className="text-xl font-semibold mb-3">Keywords</h2>
                    <div>
                        {keywords.map((keyword, index) => (
                            <button
                                key={index}
                                onClick={() => handleKeywordClick(keyword)}
                                className="block mb-2 px-4 py-2 w-full cursor-pointer text-left border rounded hover:bg-gray-200"
                            >
                                {keyword.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleResetFilters}
                    className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5 cursor-pointer"
                >
                    Reset Filters
                </button>
            </section>
        </div>
    );
};

export default Sidebar;