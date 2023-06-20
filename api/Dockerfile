FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./

EXPOSE 3000

# CMD ["npm", "run", "start"] /za każdym uruchomieniem a RUN tylko raz podczas budowania
# ENTRYPOINT ["npm", "run", "start"]
# ENV NODE_ENV production