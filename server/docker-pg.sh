#!/usr/bin/env bash

docker run --name blog-postgres \
    --env-file .env \
    -v blog-db:/var/lib/postgresql/data \
    --hostname blog-db \
    --network blog-network \
    -p 5432:5432 \
    -d postgres