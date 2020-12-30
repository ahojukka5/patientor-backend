FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

RUN npm run build

ENTRYPOINT ["npm"]

CMD ["start"]

