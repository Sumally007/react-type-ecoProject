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
        /* 
          1. KADI KUU (CONTAINER):
          - Tumebadilisha border kuwa gray-200 laini.
          - Tumeongeza rounded-2xl kwa muonekano wa kisasa.
          - Tumeongeza shadow-sm kwa kivuli cha taratibu cha mzinzo.
        */
        <div className="bg-white p-6 w-full max-w-[23rem] border border-gray-200 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-5 tracking-tight">Top Sellers</h2>

            {/* 2. LOADING STATE: Urefu umewekwa sawa ili kuzuia kadi kuruka */}
            {isLoading ? (
                <div className="h-[280px] w-full flex justify-center items-center py-5">
                    <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-black"></div>
                    <span className="ml-3 text-sm text-gray-500 font-medium">Loading sellers...</span>
                </div>
            ) : (
                <ul className="w-full space-y-4">
                    {authors.map((author, index) => (
                        <li
                            key={index}
                            /* 3. ITEM STYLING: Tumeweka border-b ili kutenganisha waagizaji kwa mstari laini */
                            className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-b-0 last:pb-0"
                        >
                            <section className="flex items-center gap-3">
                                {/* Picha yenye kivuli na mpaka wa mfano */}
                                <img
                                    src={author.image}
                                    alt={author.name}
                                    className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-100 shadow-sm"
                                />
                                <span className="font-semibold text-gray-800 text-sm">{author.name}</span>
                            </section>

                            {/* 4. KITUFE CHA FOLLOW/UNFOLLOW:
                              - Tumeongeza transition-all na active:scale-95 kwa ajili ya click effect.
                              - Rangi ya Unfollow imekuwa mchanganyiko wa gray badala ya red kali sana.
                            */}
                            <button
                                onClick={() => handleFollowClick(index)}
                                className={`py-1.5 px-4 rounded-xl font-medium text-xs transition-all duration-200 shadow-sm active:scale-95 cursor-pointer ${author.isFollowing
                                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                                        : "bg-black text-white hover:bg-gray-800"
                                    }`}
                            >
                                {author.isFollowing ? "Following" : "Follow"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TopSellers;