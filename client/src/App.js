import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

export default function Home() {

  return (
    <div className="container mx-auto space-y-4 py-12 px-8">
      <PostCreate />
      <hr />
      <PostList />
    </div>
  )
}