FROM node:latest

WORKDIR /usr/src/app

COPY ./Air-Book.postman_collection.json ./

EXPOSE 3000