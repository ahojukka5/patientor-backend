FROM node:14-alpine AS build

WORKDIR /wrk

# Build package
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Build ready, let's remove node_modules and install production dependencies
RUN rm -rf node_modules
RUN npm install --production

FROM node:14-alpine

# Setup environment variables
ENV NODE_ENV=production

# Setup user and app dir
ARG APP_HOME=/home/node/app
RUN mkdir ${APP_HOME} && chown -R node:node ${APP_HOME}
WORKDIR ${APP_HOME}
USER node

# Copy build and install production packages
COPY --chown=node:node --from=build /wrk/build ${APP_HOME}
COPY --chown=node:node --from=build /wrk/node_modules ${APP_HOME}/node_modules

# Defaults
EXPOSE 3000

CMD ["node", "src/index.js"]

