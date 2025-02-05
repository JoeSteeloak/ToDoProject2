import { useState, useEffect } from "react";

interface Post {
    id: number;
    title: string,
    description: string,
    status: string
}

function ToDoList() {

    //states
    const [posts, setPosts] = useState<Post[] | []>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getPosts();
    }, [])

    const deletePost = async (id: number) => {
        try {
            const resp = await fetch(`https://todoapi-167u.onrender.com/todos/${id}`, {
                method: "DELETE",
            });
            if (!resp.ok) {
                throw new Error("Failed to delete post");
            }
            // Uppdatera state genom att filtrera bort posten med detta id
            setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }


    const getPosts = async () => {
        try {

            setLoading(true);

            const resp = await fetch("https://todoapi-167u.onrender.com/todos");

            if (!resp.ok) {
                throw Error;
            } else {
                const data = await resp.json();

                setPosts(data);
                setError(null);
            }

        } catch (error) {
            setError("Something went wrong fetching the list...")
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {
                error && <p className="info">{error}</p>
            }

            {
                loading && <p className="info">laddar in listan...</p>
            }
            <div>
                {
                    posts.map((post) => (
                        <section key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                            <p>{post.status}</p>
                            <button onClick={() => deletePost(post.id)}>Delete</button>
                        </section>
                    ))
                }
            </div>

        </>
    );
}

export default ToDoList