FROM node:alpine
WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache --virtual .gyp \
    python \
    make \
    g++ \
    && npm install \
    && apk del .gyp
COPY . .
RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main.js" ]