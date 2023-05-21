FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY src ./src
COPY server.js ./
COPY .env ./

EXPOSE 3000

CMD ["npm", "run", "start"]