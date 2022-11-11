// ES modules
import express from "express";
import { z } from "zod";

const app = express()

app.get('/hello', (req, res) => {
    res.send('Hello!!!!')
})

app.post('/api/posts', (req, res) => {
    const post = z.object({
        title: z.string().min(2).max(50),
        content: z.string(),
        author: z.string().min(2).max(20)
    }).parse(req.body)
})

app.listen(4000)