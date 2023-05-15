FROM node:latest
WORKDIR /usr/src/app
COPY . ./
RUN npm install
RUN npm run build

FROM nginx:1.23.3
COPY --from=0 /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]