import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaArrowLeft, FaShoppingCart } from "react-icons/fa";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    images: string[];
    category?: string;
    brand?: string;
}

const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            setError(null);
            try {
                if (!id) return;
                const response = await fetch(`https://dummyjson.com/products/${id}`);

                if (!response.ok) {
                    throw new Error("Product not found");
                }

                const data: Product = await response.json();
                setProduct(data);
            } catch (err: any) {
                console.error(`Error fetching product data: ${err}`);
                setError("Product could not be found or an error occurred.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);


    return (
        <div className="w-full flex flex-col items-center h-full p-4 xl:pl-4 min-h-screen">

            <button
                onClick={() => navigate(-1)}
                className="place-self-start mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
                <FaArrowLeft size={14} />
                Back
            </button>

            {/* LOADING STATE:*/}
            {isLoading && (
                <div className="w-full h-full flex flex-col justify-center items-center xl:h-96 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                    <span className="mt-4 text-gray-600 font-medium">Fetching product details...</span>
                </div>
            )}

            {/*ERROR / NOT FOUND STATE:*/}
            {!isLoading && (error || !product) && (
                <div className="flex flex-col justify-center items-center h-96 bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm">
                    <h2 className="text-2xl font-bold text-red-500 mb-2">
                        {error || "Product Not Found"}
                    </h2>
                    <p className="text-gray-500 mb-6">
                        The item you are looking for might have been removed or is temporarily unavailable.
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                        Go Back
                    </button>
                </div>
            )}

            {/* SUCCESS STATE (MUONEKANO MPYA):*/}
            {!isLoading && product && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">


                        <div className="w-full h-[320px] xl:h-80 bg-gray-50 rounded-xl p-4 flex items-center justify-center overflow-hidden border border-gray-100">
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300 ease-in-out"
                            />
                        </div>


                        <div className="flex flex-col">

                            {product.category && (
                                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit mb-3">
                                    {product.category}
                                </span>
                            )}


                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                                {product.title}
                            </h1>


                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center text-amber-400 bg-amber-50 px-2.5 py-1 rounded-md text-sm font-semibold">
                                    <FaStar className="mr-1 fill-amber-400" />
                                    <span>{product.rating}</span>
                                </div>
                                <span className="text-sm text-gray-400">| Customer Rating</span>
                            </div>


                            <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
                                {product.description}
                            </p>


                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                                <div>
                                    <span className="text-xs text-gray-400 block uppercase font-medium">Price</span>
                                    <span className="text-3xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
                                </div>

                                <button className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 text-white font-medium rounded-xl transition-all shadow-md active:scale-95 cursor-pointer">
                                    <FaShoppingCart size={16} />
                                    <span>Add to Cart</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage;