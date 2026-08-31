import { useState } from "react";
import { BiComment } from "react-icons/bi";
import { FiThumbsUp } from "react-icons/fi";

const PopularBlogs = () => {
    const [blogList, setBlogList] = useState([
        { title: "My Amazing Blog Title 1", author: "Jordan", likes: 142, comments: 44, isLiked: false },
        { title: "My Amazing Blog Title 2", author: "John", likes: 153, comments: 25, isLiked: false },
        { title: "My Amazing Blog Title 3", author: "Ismail", likes: 200, comments: 100, isLiked: false },
        { title: "My Amazing Blog Title", author: "Said", likes: 50, comments: 14, isLiked: false },
    ]);

    const handleClickLikes = (index: number) => {
        setBlogList((prevBlogs) =>
            prevBlogs.map((blog, i) => {
                if (i === index) {
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
        /* 
          1. KADI KUU (CONTAINER):
          - Tumeweka mt-5 badala ya mt-4.
          - Mipaka laini ya border-gray-200 na rounded-2xl na shadow-sm.
        */
        <div className="bg-white p-6 w-full max-w-[23rem] mt-5 border border-gray-200 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-5 tracking-tight">Popular Blogs</h2>

            <ul className="space-y-4">
                {blogList.map((blog, index) => (
                    <li
                        key={index}
                        /* 2. ITEM CONTAINER: 
                           Kazi ya background ya gray-50 na hover effect ili kufanya kila blog ionekane kama kadi ndogo (sub-card)
                        */
                        className="p-3.5 bg-gray-50/70 hover:bg-gray-100/80 rounded-xl transition-colors duration-200 border border-gray-100"
                    >
                        {/* Title ya blog */}
                        <h3 className="font-bold text-gray-800 text-sm mb-1 leading-snug">
                            {blog.title}
                        </h3>

                        {/* Mwandishi wa Blog */}
                        <p className="text-xs text-gray-500 mb-3">
                            Published by <span className="font-medium text-gray-700">{blog.author}</span>
                        </p>

                        {/* 3. SECTION YA INTERACTION (COMMENTS & LIKES): */}
                        <div className="flex items-center gap-4 text-xs font-semibold text-gray-600 pt-2 border-t border-gray-200/60">

                            {/* Comments Count */}
                            <div className="flex items-center gap-1.5 text-gray-500">
                                <BiComment size={15} />
                                <span>{blog.comments}</span>
                            </div>

                            {/* Like Button na Counter */}
                            <button
                                onClick={() => handleClickLikes(index)}
                                className={`flex items-center gap-1.5 transition-all duration-200 active:scale-110 cursor-pointer ${blog.isLiked ? "text-blue-600 font-bold" : "text-gray-500 hover:text-gray-800"
                                    }`}
                            >
                                <FiThumbsUp
                                    size={15}
                                    className={`transition-colors ${blog.isLiked ? "fill-blue-600 text-blue-600" : "text-gray-400"
                                        }`}
                                />
                                <span>{blog.likes}</span>
                            </button>

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PopularBlogs;