import React from 'react'
import { Post } from './@types'

type Props = {
    posts: Post[]
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

type PostEdit = {
    title?: string
    content?: string
    author?: string
}

function changePost(oldPost: Post, postEdit: PostEdit) {
    let newPost = { ...oldPost }
    if (postEdit.title) newPost.title = postEdit.title
    if (postEdit.author) newPost.author = postEdit.author
    return newPost
}

function PostsList({ posts, setPosts }: Props) {
    async function editPost(id: string, postEdit: PostEdit) {
        // fetch
        setPosts(prevState => {
            return prevState.map(post => {
                return post.id === id ? changePost(post, postEdit) : post
            })
        })
    }
    return (
        <ul>
            {posts.map(post => {
                return <li key={post.id}>
                    <span>{post.title}</span>
                </li>
            })}
        </ul>
    )
}

export default PostsList