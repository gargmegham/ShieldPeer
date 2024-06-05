#!/bin/bash

# Define your container and image names
CONTAINER_NAME=shield-peer-bot
IMAGE_NAME=shield-peer

# Stop and remove the previous container if it exists
if [ $(docker ps -q -f name=$CONTAINER_NAME) ]; then
    echo "Stopping and removing the previous container..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
else
    echo "No previous container to remove."
fi

# Remove the previous image if it exists
if [ $(docker images -q $IMAGE_NAME) ]; then
    echo "Removing the previous image..."
    docker rmi $IMAGE_NAME
else
    echo "No previous image to remove."
fi

# Build the new image
echo "Building the new image..."
docker build -t $IMAGE_NAME .

# Run a new container from the new image
echo "Running the new container..."
docker run -d --name $CONTAINER_NAME $IMAGE_NAME

echo "Rebuild and cleanup complete."
