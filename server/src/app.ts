// ES modules
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import express, { ErrorRequestHandler } from "express";
import 'express-async-errors';
import { z, ZodError } from "zod";
import createHttpError from 'http-errors';
import { postsRouter } from "./posts";

const app = express()
app.use(express.json())

app.get('/hello', (req, res) => {
    res.send('Hello!!!!')
})

app.use('/api/posts', postsRouter)

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof ZodError) {
        return res.status(400).send({
            message: "Wrong user's credentials"
        })
    }
    if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
            return res.status(400).send({
                message: "Email is not unique"
            })
        }
    }
    if (error instanceof createHttpError.HttpError) {
        return res.status(error.status).send({
            message: error.message
        })
    }
    res.status(500).send({
        message: error.message
    })
}

app.use(errorHandler)

app.listen(4000)