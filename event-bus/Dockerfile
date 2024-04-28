FROM node:alpine

LABEL maintainer="minjastermoses@gmail.com"

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]