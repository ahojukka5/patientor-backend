FROM node:14-alpine

ARG APP_HOME=/home/node/app

RUN mkdir ${APP_HOME} && chown -R node:node ${APP_HOME}

WORKDIR ${APP_HOME}

USER node

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

RUN npm run build


CMD ["node", "build/src/index.js"]

