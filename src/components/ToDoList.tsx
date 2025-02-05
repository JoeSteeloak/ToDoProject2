import { useState } from "react";

interface Post {
    title: string,
    description: string,
    status: string
}

function ToDoList() {

    //states
    const [posts, setPosts] = useState([]);

    return (
        <>
        
        </>
    );
}

export default ToDoList