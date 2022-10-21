FROM node:latest

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json /usr/src/bot
RUN npm install

RUN apt-get update || : && apt-get install python -y
RUN apt-get install ffmpeg -y

RUN npm ci

COPY . /usr/src/bot

CMD ["node", "index.js"]