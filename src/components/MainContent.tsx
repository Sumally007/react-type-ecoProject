import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext"
import { LuTally3 } from "react-icons/lu";
import axios from "axios";
import BookCard from "./BookCard";
import { MdMenu } from "react-icons/md";


const MainContent = () => {
    const { searchQuery, selectedCategory, minPrice, maxPrice, keyword,
        toggleSidebar, } = useFilter();

    const [products, setProducts] = useState<any[]>([]);
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const itemsPerPage = 12;

    // this hook below will get products from API only when the current page or keyword change
    useEffect(() => {

        let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;

        if (keyword) {
            url = `https://dummyjson.com/products/search?q=${keyword}`;
        }

        axios.get(url).then(response => {
            setProducts(response.data.products);
            console.log(response.data.products)
        }).catch(error => {
            console.error("Error fetching data", error);
        })
    }, [currentPage, keyword]);


    //this function below will only filter products that the user select on the categories
    const getFilteredProducts = () => {
        let filteredProducts = products;
        // this if statement will check if there is a selected category in the state and select products of that state
        if (selectedCategory) {
            filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
            // console.log(filteredProducts)
        }

        if (minPrice !== undefined) {
            filteredProducts = filteredProducts.filter(product => product.price >= minPrice)
            // console.log(filteredProducts)
        }

        if (maxPrice !== undefined) {
            filteredProducts = filteredProducts.filter(product => product.price <= maxPrice)
        }

        if (searchQuery) {
            filteredProducts = filteredProducts.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            console.log(filteredProducts)
        }

        switch (filter) {
            case "expensive":
                return filteredProducts.sort((a, b) => b.price - a.price);

            case "cheap":
                return filteredProducts.sort((a, b) => a.price - b.price)

            case "popular":
                return filteredProducts.sort((a, b) => b.rating - a.rating)
            default:
                return filteredProducts;
        }
    }

    const filteredProducts = getFilteredProducts();

    const totalProducts = 100;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    }

    const getPaginationButtons = () => {
        const buttons: number[] = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage - 2 < 1) {
            endPage = Math.min(totalPages, endPage + (2 - currentPage - 1));
        }

        if (currentPage + 2 < 1) {
            startPage = Math.min(1, startPage - (2 - totalPages - currentPage));
        }

        for (let page = startPage; page <= endPage; page++) {
            buttons.push(page);
        }

        return buttons;
    }


    return (
        <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
            <div className="mb-5">
                <div className="flex sm:flex-row justify-between items-center">
                    <div>
                        <h1 className="flex justify-between items-center text-2xl font-bold mb-10 mt-4 sm:hidden"><MdMenu onClick={toggleSidebar} size={16} className="text-center mr-2 sm:hidden" />React Store
                        </h1>
                    </div>
                    <div className="relative mb-5 mt-5">
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="border px-4 py-2 rounded-full flex items-center cursor-pointer">
                            <LuTally3 />
                            {filter === "all" ? "filter" : filter.charAt(0).toLowerCase() + filter.slice(1)}
                        </button>

                        {dropdownOpen && (
                            <div className="absolute bg-white border-gray-300 rounded mt-2 w-full sm:w-40">
                                <button onClick={() => setFilter("cheap")} className="block px-4 py-2 w-full text-left hover:bg-gray-200 cursor-pointer">
                                    Cheap
                                </button>
                                <button onClick={() => setFilter("expensive")} className="block px-4 py-2 w-full text-left hover:bg-gray-200 cursor-pointer">
                                    Expensive
                                </button>
                                <button onClick={() => setFilter("popular")} className="block px-4 py-2 w-full text-left hover:bg-gray-200 cursor-pointer">
                                    Popular
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {filteredProducts.map((product) => (
                        <BookCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            image={product.thumbnail}
                            price={product.price} />
                    ))}
                </div>

                <div className="flex sm:flex-row justify-center items-center mt-5">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="border px-4 py-2 mx-2 rounded-full cursor-pointer"
                        disabled={currentPage === 1}>
                        Previous
                    </button>
                    {getPaginationButtons().map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`border px-4 py-2 mx-1 rounded-full cursor-pointer ${page === currentPage ? "bg-black text-white" : ""}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="border px-4 py-2 mx-2 rounded-full cursor-pointer">
                        Next
                    </button>
                </div>
            </div>

        </section>
    )
}

export default MainContent