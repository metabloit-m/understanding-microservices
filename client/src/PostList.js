import React, {useEffect, useState} from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default function PostList() {

    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
  
      const response = await axios.get("http://posts.com/posts");
      setPosts(Object.values(response.data));
  
    }
  
    useEffect(() => {
      fetchPosts();
      console.log(posts);

    }, []);

    return (
        <div className="flex flex-row space-x-2 justify-between items-stretch">
            {posts && posts.map(post => {
                return (
                    <div key={post.id} className="flex flex-col max-w-lg border-2 space-y-4 p-8 rounded-md">
                        <div className="flex flex-row justify-between">
                            <h1 className="text-2xl font-semibold">{post.title}</h1>
                        </div>

                        <div className="space-y-2">
                            <CommentList comments={post.comments} />
                            <CommentCreate id={post.id} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}