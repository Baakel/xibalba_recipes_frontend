FROM node:16.2-slim

WORKDIR /usr/src/xibalba_recipes

COPY package*.json ./

RUN npm install
#RUN npm ci --only=production

COPY ./build ./build

EXPOSE 3000

CMD ["node", "build", "-H", "0.0.0.0"]
