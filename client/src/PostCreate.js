import React, {useState} from "react";
import axios from "axios";

export default function PostCreate() {

    const [values, setValues] = useState({
        title: ''
    });


    const handleChange = inputName => e => {
        setValues({...values, [inputName]: e.target.value});
    }

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.post("http://posts.com/posts/create", {
            title: values.title
        });

        setValues({...values, title: ''});
    }



  return (
    <div className="container mx-auto ">
      <h1 className="font-bold text-4xl">Create Post</h1>
        <form className="flex flex-col space-y-4 py-12" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4"> 
                <label>Title: </label>
                <input className="border-2 p-2 rounded-md border-blue-800" onChange={handleChange('title')} value={values.title} type="text" name="title" />
            </div>
            <button className="text-white bg-blue-700 p-2 rounded-md grow-0 w-28 cursor-pointer" type="submit">Submit</button>
        </form>
    </div>
  )
}
