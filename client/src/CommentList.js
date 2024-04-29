import React from "react";


export default function CommentList({ comments }) {

  return (
    <div>
            {comments && (<ul className="list-disc list-inside"> {comments.map(comment => {

                let content;

                if(comment.status === "approved") content = comment.content;
                else if(comment.status === "pending") content = "This comment is awaiting moderation";
                else if(comment.status === "rejected") content = "This comment has been rejected";

                return (
                    <li className="indent-4" key={comment.id}>
                        {content}
                    </li>
                )
            })}</ul>)}
    </div>
  )
}
