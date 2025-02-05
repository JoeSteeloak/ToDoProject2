import "./ToDoList.css"
interface Post {
    id: number;
    title: string;
    description: string;
    status: string;
}

interface Props {
    posts: Post[];
    loading: boolean;
    error: string | null;
    getPosts: () => void; // Funktion för att uppdatera listan
}

const ToDoList = ({ posts, loading, error, getPosts }: Props) => {
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`https://todoapi-167u.onrender.com/todos/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete post");
            }

            // Uppdatera listan efter radering
            getPosts();
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    // Funktion för att byta status i en cykel
    const handleToggleStatus = async (id: number, currentStatus: string) => {
        // Definiera status-ordningen
        const statusOrder = ["not started", "in progress", "finished"];

        // Hitta nästa status
        const nextStatus =
            statusOrder[(statusOrder.indexOf(currentStatus) + 1) % statusOrder.length];

        try {
            const response = await fetch(`https://todoapi-167u.onrender.com/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: nextStatus }),
            });

            if (!response.ok) {
                throw new Error("Failed to update status");
            }

            // Uppdatera listan efter ändringen
            getPosts();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <>
            {error && <p className="info">{error}</p>}
            {loading && <p className="info">Loading list...</p>}
            <div>
                {posts.map((post) => (
                    <section key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        {/* Klickbar status */}
                        <button 
    className={`status-${post.status.replace(" ", "-").toLowerCase()}`}
    onClick={() => handleToggleStatus(post.id, post.status)}
>
    Status: {post.status}
</button>

<button className="delete" onClick={() => handleDelete(post.id)}>Delete</button>
                    </section>
                ))}
            </div>
        </>
    );
};

export default ToDoList;
