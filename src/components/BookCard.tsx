import { Link } from "react-router-dom";


interface BookCardProps {
    id: string;
    title: string;
    image: string;
    price: number;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, image, price }) => {
    return (
        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 group">
            <Link to={`/product/${id}`} className="flex flex-col items-center h-full justify-between">
                <div className="w-full h-36 overflow-hidden rounded-lg mb-3 flex items-center justify-center">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 ease-in-out"
                    />
                </div>
                <div className="w-full text-left">
                    <h2 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">{title}</h2>
                    <p className="font-bold text-gray-900">${price.toFixed(2)}</p>
                </div>
            </Link>
        </div>
    )
}

export default BookCard