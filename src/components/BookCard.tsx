import { Link } from "react-router-dom";


interface BookCardProps {
    id: string;
    title: string;
    image: string;
    price: number;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, image, price }) => {
    return (
        <div className="flex flex-col items-center border p-4 rounded w-[195px] h-[249.6px]">
            <Link to={`/product/${id}`}>
                <img
                    src={image}
                    alt={title}
                    className="w=full h-32 mb-2"
                />
                <h2 className="font-bold">{title}</h2>
                <p>${price}</p>
            </Link>
        </div>
    )
}

export default BookCard