#!/bin/bash

container_name="eight-bar-line-docker"
image_name="postgres"
env_file="./backend/database.env"

# Check if a container with the same name exists
if [ "$(docker ps -a -q -f name=$container_name)" ]; then
    # Stop and remove the existing container
    docker stop $container_name
    docker rm $container_name
fi

# Run the PostgreSQL Docker container
docker run --env-file $env_file -p 5432:5432 --name $container_name -d $image_name