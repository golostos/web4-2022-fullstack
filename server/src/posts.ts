import { db } from "./db"
import express from "express"
import { z } from "zod"
import { setTimeout as wait } from "node:timers/promises"

export const postsRouter = express.Router()

// CRUD for resource

postsRouter.post('/', async (req, res) => {
    const post = z.object({
        title: z.string().min(2).max(50),
        content: z.string(),
        author: z.string().min(2).max(20)
    }).parse(req.body)
    const postFromDb = await db.post.create({
        data: post,
        select: {
            id: true,
            title: true,
            author: true
        }
    })
    res.status(201).send(postFromDb)
})

postsRouter.get('/', async (req, res) => {
    const posts = await db.post.findMany({
        select: {
            id: true,
            title: true,
            author: true,
            createdAt: true
        }
    })
    await wait(1000)
    res.send(posts)
})

postsRouter.get('/:postId', async (req, res) => {
    const post = await db.post.findUnique({
        where: {
            id: z.string().uuid().parse(req.params.postId)
        }
    })
    res.send(post)
})

postsRouter.delete('/:postId', async (req, res) => {
    const post = await db.post.delete({
        where: {
            id: z.string().uuid().parse(req.params.postId)
        }
    })
    res.send(post)
})

postsRouter.patch('/:postId', async (req, res) => {
    const post = z.object({
        title: z.string().min(2).max(50).optional(),
        content: z.string().optional(),
        author: z.string().min(2).max(20).optional()
    }).parse(req.body)
    const postFromDb = await db.post.update({
        data: post,
        where: {
            id: z.string().uuid().parse(req.params.postId)
        }
    })
    res.status(200).send(postFromDb)
})