import ToDoForm from "./components/ToDoForm"
import ToDoList from "./components/ToDoList"
import { useState, useEffect } from "react";


interface Post {
  id: number;
  title: string;
  description: string;
  status: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getPosts = async () => {
    try {
      setLoading(true);
      const resp = await fetch("https://todoapi-167u.onrender.com/todos");

      if (!resp.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await resp.json();
      setPosts(data);
      setError(null);
    } catch (error) {
      setError("Something went wrong fetching the list...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <ToDoForm getPosts={getPosts} />
      <ToDoList posts={posts} loading={loading} error={error} getPosts={getPosts} />
    </div>
  );
}

export default App;
