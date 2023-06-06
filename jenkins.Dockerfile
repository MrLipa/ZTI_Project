FROM node:latest
WORKDIR /usr/src/app
RUN cd /backend && npm install

EXPOSE 3000