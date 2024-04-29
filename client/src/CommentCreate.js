import React, {useState} from "react";
import axios from "axios";


export default function CommentCreate(props) {

    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://posts.com/posts/${props.id}/comments`, {
            content
        });

        setContent('');
    }


  return (
    <div className="space-y-2">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <label className="font-medium">Comment: </label>
                <input className="border-2 border-slate-600 focus:ring-blue-700 focus:ring-2 focus:ring-offset-2 focus:border-blue-400 rounded-md focus:outline-none py-1 px-2" type="text" value={content} onChange={(e) => {setContent(e.target.value)}} />
            </div>
            <button className="self-start bg-slate-800 py-2 px-4 rounded-md text-white hover:bg-blue-500" type="submit">Submit</button>
        </form>
    </div>
  )
}
