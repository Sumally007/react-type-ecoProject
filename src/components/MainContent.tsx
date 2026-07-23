import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext"
import { LuTally3 } from "react-icons/lu";
import axios from "axios";


const MainContent = () => {
    const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } = useFilter();

    const [products, setProducts] = useState<any>([]);
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




    return (
        <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
            <div className="mb-5">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="relative mb-5 mt-5">
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="border px-4 py-2 rounded-full flex items-center">
                            <LuTally3 />
                            {filter === "all" ? "filter" : filter.charAt(0).toLowerCase() + filter.slice(1)}
                        </button>

                        {dropdownOpen && (
                            <div className="absolute bg-white border-gray-300 rounded mt-2 w-full sm:w-40">
                                <button onClick={() => setFilter("cheap")} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                                    Cheap
                                </button>
                                <button onClick={() => setFilter("expensive")} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                                    Expensive
                                </button>
                                <button onClick={() => setFilter("popular")} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                                    Popular
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {/* BookCard */}
            </div>
        </section>
    )
}

export default MainContent