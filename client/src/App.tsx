import { useEffect, useState } from "react";

type Post = {
  id: string,
  title: string,
  author: string,
  createdAt: string
}

function App() {
  const [title, setTitle] = useState("Title")
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
  }, [title])

  return (
    <main>
      <h1>Posts:</h1>
      <form>
        <label htmlFor="title-input">Title</label>
        <input
          value={title}
          onChange={(event) => { setTitle(event.target.value) }}
          type="text"
          id="title-input"
          placeholder="Title" />
      </form>
      <ul>
        {posts.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>
    </main>
  )
}

// function PostInfo(props: { title: string, content: string }) {
//   return (
//     <div>
//       {props.title}
//       <br />
//       {props.content}
//     </div>
//   )
// }

export default App;
