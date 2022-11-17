import { useEffect, useState } from "react";
import { Post } from "./@types";
import NewPost from "./NewPost";
import PostsList from "./PostsList";

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  console.log('Render');
  useEffect(() => {
    let cancel = false
    async function getPosts() {
      const res = await fetch('/api/posts')
      const posts = await res.json()
      if (!cancel) {
        console.log('setPosts');
        setPosts(posts)
      }
    }
    getPosts()
    return () => {
      cancel = true
      console.log('Unmount');
    }
  }, [])

  return (
    <main>
      <h1>Posts:</h1>
      <NewPost posts={posts} setPosts={setPosts} />
      <PostsList posts={posts} />
    </main>
  )
}

export default App;
