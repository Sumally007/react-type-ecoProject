import { useState } from "react"
import { BiComment } from "react-icons/bi"
import { FiThumbsUp } from "react-icons/fi"

const PopularBlogs = () => {
    const [blogList, setBlogList] = useState([
        { title: "My Amazing Blog Title 1", author: "Jordan", likes: 142, comments: 44, isLiked: false },
        { title: "My Amazing Blog Title 2", author: "John", likes: 153, comments: 25, isLiked: false },
        { title: "My Amazing Blog Title 3", author: "Ismail", likes: 200, comments: 100, isLiked: false },
        { title: "My Amazing Blog Title", author: "Said", likes: 50, comments: 14, isLiked: false },
    ]);

    // const blogs = [
    //     {
    //         title: "My Amazing Blog Title 1",
    //         author: "Jordan",
    //         likes: 142,
    //         comments: 44,
    //     },
    //     {
    //         title: "My Amazing Blog Title 2",
    //         author: "John",
    //         likes: 153,
    //         comments: 25,
    //     },
    //     {
    //         title: "My Amazing Blog Title 3",
    //         author: "Ismail",
    //         likes: 200,
    //         comments: 100,
    //     },
    //     {
    //         title: "My Amazing Blog Title",
    //         author: "Said",
    //         likes: 50,
    //         comments: 14,
    //     }
    // ]

    const handleClickLikes = (index: number) => {
        setBlogList((prevBlogs) =>
            prevBlogs.map((blog, i) => {
                if (i === index) {
                    // Kama alikuwa amesha-like: inapunguza like 1 na kuweka isLiked = false
                    // Kama alikuwa hajali-like: inaongeza like 1 na kuweka isLiked = true
                    const willLike = !blog.isLiked;
                    return {
                        ...blog,
                        isLiked: willLike,
                        likes: willLike ? blog.likes + 1 : blog.likes - 1,
                    };
                }
                return blog;
            })
        );
    };

    return (

        <div className="bg-white p-5 w-[23rem] mt-4 border ml-5 rounded">
            <h2 className="text-xl font-bold mb-5">Popular Blogs</h2>

            <ul>
                {blogList.map((blog, index) => (
                    <li key={index} className="mb-4">
                        <div className="flex justify-between items-center">
                            <span className="font-bold mb-2">{blog.title}</span>
                        </div>
                        <span className="text-gray-600">Publish by {blog.author}</span>
                        <div className="flex items-center mt-2">
                            <BiComment size={16} />
                            <span className="text-gray-500 mr-5 ml-1">
                                {blog.comments}
                            </span>

                            <FiThumbsUp
                                onClick={() => handleClickLikes(index)}
                                className={`cursor-pointer ${blog.isLiked ? "fill-blue-500 text-blue-500" : "fill-white text-gray-400"
                                    }`}
                                size={16}
                            />

                            {/* Namba ya Likes inayoongezeka / kupungua */}
                            <span className="text-gray-500 mr-2 ml-2">
                                {blog.likes}
                            </span>

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PopularBlogs