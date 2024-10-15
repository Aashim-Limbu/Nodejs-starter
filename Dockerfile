FROM node:lts-alpine

WORKDIR /server

COPY . .

RUN npm install

EXPOSE 8000

CMD [ "nodemon","server.js" ]
