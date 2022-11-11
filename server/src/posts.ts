import { db } from "./db"
import express from "express"
import { z } from "zod"

export const postsRouter = express.Router()

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