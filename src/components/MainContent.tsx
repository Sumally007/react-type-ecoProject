import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { LuTally3 } from "react-icons/lu";
import BookCard from "./BookCard";
import { MdMenu } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

const MainContent = () => {
    const { searchQuery, setSearchQuery, selectedCategory, minPrice, maxPrice, keyword, toggleSidebar } = useFilter();

    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchProductPerPage = async () => {
            setIsLoading(true);
            try {
                let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;

                if (keyword) {
                    url = `https://dummyjson.com/products/search?q=${keyword}`;
                }

                const response = await fetch(url);
                const data = await response.json();
                setProducts(data.products || []);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProductPerPage();
    }, [currentPage, keyword]);

    const getFilteredProducts = () => {
        let filteredProducts = products;

        if (selectedCategory) {
            filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
        }

        if (minPrice !== undefined) {
            filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
        }

        if (maxPrice !== undefined) {
            filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
        }

        if (searchQuery) {
            filteredProducts = filteredProducts.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        switch (filter) {
            case "expensive":
                return [...filteredProducts].sort((a, b) => b.price - a.price);
            case "cheap":
                return [...filteredProducts].sort((a, b) => a.price - b.price);
            case "popular":
                return [...filteredProducts].sort((a, b) => b.rating - a.rating);
            default:
                return filteredProducts;
        }
    };

    const filteredProducts = getFilteredProducts();
    const totalProducts = 100;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPaginationButtons = () => {
        const buttons: number[] = [];
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, currentPage + 1);

        if (currentPage === 1) {
            endPage = Math.min(totalPages, startPage + 2);
        } else if (currentPage === totalPages) {
            startPage = Math.max(1, endPage - 2);
        }

        for (let page = startPage; page <= endPage; page++) {
            buttons.push(page);
        }
        return buttons;
    };

    return (
        <section className="w-full max-w-[55rem] p-4">
            <div>
                <div className="flex sm:flex-row justify-between items-center  flex-wrap">
                    <div>
                        <h1 className="flex justify-between items-center text-2xl font-bold mb-5 xl:mb-10 mt-4 sm:hidden">
                            <MdMenu onClick={toggleSidebar} size={26} className="text-center mr-2 sm:hidden cursor-pointer" />
                            React Store
                        </h1>
                    </div>
                    <div className="relative mb-5">
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="border bg-pink-500 text-white px-4 py-2 rounded-full flex items-center cursor-pointer">
                            <LuTally3 />
                            {filter === "all" ? "filter" : filter.charAt(0).toLowerCase() + filter.slice(1)}
                        </button>

                        {dropdownOpen && (
                            <div className="absolute bg-white border-gray-300 rounded mt-2 w-full sm:w-40 z-10 shadow-md">
                                <button onClick={() => { setFilter("cheap"); setDropdownOpen(false); }} className={`block px-4 py-2 w-full text-left cursor-pointer ${filter === "cheap" ? "bg-pink-100 text-pink-600" : "hover:bg-gray-100 text-gray-700"
                                    }`}>
                                    Cheap
                                </button>
                                <button onClick={() => { setFilter("expensive"); setDropdownOpen(false); }} className={`block px-4 py-2 w-full text-left cursor-pointer ${filter === "expensive" ? "bg-pink-100 text-pink-600" : "hover:bg-gray-100 text-gray-700"
                                    }`}>
                                    Expensive
                                </button>
                                <button onClick={() => { setFilter("popular"); setDropdownOpen(false); }} className={`block px-4 py-2 w-full text-left cursor-pointer ${filter === "popular" ? "bg-pink-100 text-pink-600" : "hover:bg-gray-100 text-gray-700"
                                    }`}>
                                    Popular
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="relative w-full mb-10 sm:hidden">
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

                {/* State handling: Loading vs Empty vs Data */}
                {isLoading ? (
                    <div className="w-full min-h-[600px] sm:min-h-[700px] flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
                        <span className="ml-3 text-lg font-semibold">Loading products...</span>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-16 border rounded bg-gray-50">
                        <h2 className="text-xl font-bold text-gray-600 mb-2">No Products Found</h2>
                        <p className="text-gray-500">Try adjusting your filter or search keywords.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                        {filteredProducts.map((product) => (
                            <BookCard
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                image={product.thumbnail}
                                price={product.price}
                            />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!isLoading && filteredProducts.length > 0 && (
                    <div className="flex sm:flex-row justify-center items-center mt-5">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="border px-4 py-2 mx-2 bg-indigo-950 text-white rounded-full cursor-pointer disabled:opacity-50"
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {getPaginationButtons().map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`border px-4 py-2 mx-1 rounded-full cursor-pointer ${page === currentPage ? "bg-indigo-950 text-white" : ""}`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="border px-4 py-2 mx-2 bg-indigo-950 text-white rounded-full cursor-pointer disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MainContent;