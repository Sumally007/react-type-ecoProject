import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    images: string[];
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

    // Loading State
    if (isLoading) {
        return (
            <div className="p-10 flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
                <span className="ml-3 text-lg font-semibold">Loading product...</span>
            </div>
        );
    }

    // Error au Product Not Found State
    if (error || !product) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-2xl font-bold text-red-500 mb-4">
                    {error || "Product Not Found"}
                </h2>
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-black text-white rounded cursor-pointer"
                >
                    Go Back
                </button>
            </div>
        );
    }

    // Success State
    return (
        <div className="h-[886px] xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
            <button
                onClick={() => navigate(-1)}
                className="mb-5 px-4 py-2 bg-black text-white rounded cursor-pointer"
            >
                Back
            </button>

            <img
                src={product.images[0]}
                alt={product.title}
                className="w-[50%] h-auto mb-5"
            />

            <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
            <p className="mb-4 text-gray-700 w-[70%]">{product.description}</p>

            <div className="flex">
                <p>Price: ${product.price}</p>
                <p className="ml-10">Rating: {product.rating}</p>
            </div>
        </div>
    );
};

export default ProductPage;