#!/usr/bin/env bash

docker run --name blog-adminer \
    --hostname blog-adminer \
    --network blog-network \
    -p 8080:8080 \
    -d adminer