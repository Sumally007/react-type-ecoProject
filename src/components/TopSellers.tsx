import { useEffect, useState } from "react";

interface Author {
    name: string;
    isFollowing: boolean;
    image: string;
}

const TopSellers = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("https://randomuser.me/api/?results=5");
                const data = await response.json();

                const authorsData: Author[] = data.results.map((user: any) => ({
                    name: `${user.name.first} ${user.name.last}`,
                    isFollowing: false,
                    image: user.picture.medium,
                }));
                setAuthors(authorsData);
            } catch (error) {
                console.error(`Error fetching authors: ${error}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFollowClick = (index: number) => {
        setAuthors((prevAuthor) =>
            prevAuthor.map((author, i) =>
                i === index ? { ...author, isFollowing: !author.isFollowing } : author
            )
        );
    };

    return (
        <div className="bg-white p-5 mx-5 mt-5 sm:mt-[5rem] border w-[23rem] rounded">
            <h2 className="text-xl font-bold mb-5">Top Sellers</h2>

            {isLoading ? (
                <div className="flex justify-center items-center py-5">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                    <span className="ml-2 text-sm text-gray-500">Loading sellers...</span>
                </div>
            ) : (
                <ul>
                    {authors.map((author, index) => (
                        <li key={index} className="flex items-center justify-between mb-4">
                            <section className="flex items-center">
                                <img
                                    src={author.image}
                                    alt={author.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="ml-4 font-medium">{author.name}</span>
                            </section>

                            <button
                                onClick={() => handleFollowClick(index)}
                                className={`py-1 px-3 rounded cursor-pointer text-sm ${author.isFollowing ? "bg-red-500 text-white" : "bg-black text-white"
                                    }`}
                            >
                                {author.isFollowing ? "Unfollow" : "Follow"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TopSellers;