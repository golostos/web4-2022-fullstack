import React, { useState } from 'react'
import { Post } from './@types'

type Props = {
    posts: Post[]
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

function NewPost({posts, setPosts}: Props) {
  const [title, setTitle] = useState("Title")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            content,
            author
        })
    })
    if (response.ok) {
        const postFromServer = await response.json()
        setPosts([...posts, {
            id: postFromServer.id, 
            author, 
            title, 
            createdAt: postFromServer.createdAt }])
    }
  }
  return (
    <div>
        <h2>Create new post:</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor='title'>Title:</label>
            <input id='title' 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
            />
            <label htmlFor='content'>Content:</label>
            <input id='content' 
                value={content} 
                onChange={e => setContent(e.target.value)} 
            />
            <label htmlFor='author'>Author:</label>
            <input id='author' 
                value={author} 
                onChange={e => setAuthor(e.target.value)} 
            />
            <button type='submit'>Create</button>
        </form>
    </div>
  )
}

export default NewPost