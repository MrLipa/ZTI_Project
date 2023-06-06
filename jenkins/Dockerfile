FROM node:latest
WORKDIR /usr/src/app
COPY ./backend/package*.json ./backend/
RUN npm install
COPY ./backend ./
EXPOSE 3000
