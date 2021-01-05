FROM node:14-alpine AS app

WORKDIR /wrk

# Build package
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Build ready, let's remove node_modules and install production dependencies
RUN rm -rf node_modules
ENV NODE_ENV=production
RUN npm install --production


### Time to create nodejs scratch ###
FROM alpine AS node
RUN apk add --update nodejs


### Copy only relevant files from node ###
FROM scratch AS node-scratch
COPY --from=node /usr/bin/node /usr/bin/node
COPY --from=node /lib/ld-musl-x86_64.so.1 /lib/ld-musl-x86_64.so.1
COPY --from=node /lib/libz.so.1 /lib/libz.so.1
COPY --from=node /lib/libz.so.1.2.11 /lib/libz.so.1.2.11
COPY --from=node /usr/lib/libuv.so.1 /usr/lib/libuv.so.1
COPY --from=node /usr/lib/libuv.so.1.0.0 /usr/lib/libuv.so.1.0.0
COPY --from=node /usr/lib/libbrotlidec.so.1 /usr/lib/libbrotlidec.so.1
COPY --from=node /usr/lib/libbrotlidec.so.1.0.9 /usr/lib/libbrotlidec.so.1.0.9
COPY --from=node /usr/lib/libbrotlienc.so.1 /usr/lib/libbrotlienc.so.1
COPY --from=node /usr/lib/libbrotlienc.so.1.0.9 /usr/lib/libbrotlienc.so.1.0.9
COPY --from=node /usr/lib/libcares.so.2 /usr/lib/libcares.so.2
COPY --from=node /usr/lib/libcares.so.2.4.0 /usr/lib/libcares.so.2.4.0
COPY --from=node /usr/lib/libnghttp2.so.14 /usr/lib/libnghttp2.so.14
COPY --from=node /usr/lib/libnghttp2.so.14.20.0 /usr/lib/libnghttp2.so.14.20.0
COPY --from=node /lib/libcrypto.so.1.1 /lib/libcrypto.so.1.1
COPY --from=node /lib/libssl.so.1.1 /lib/libssl.so.1.1
COPY --from=node /usr/lib/libstdc++.so.6 /usr/lib/libstdc++.so.6
COPY --from=node /usr/lib/libstdc++.so.6.0.28 /usr/lib/libstdc++.so.6.0.28
COPY --from=node /usr/lib/libgcc_s.so.1 /usr/lib/libgcc_s.so.1
COPY --from=node /lib/ld-musl-x86_64.so.1 /lib/ld-musl-x86_64.so.1
COPY --from=node /usr/lib/libbrotlicommon.so.1 /usr/lib/libbrotlicommon.so.1
COPY --from=node /usr/lib/libbrotlicommon.so.1.0.9 /usr/lib/libbrotlicommon.so.1.0.9

### Build final image ###
FROM scratch AS final
ARG APP_HOME=/app
WORKDIR ${APP_HOME}
# Copy node (change node-scratch to node to get full alpine image)
COPY --from=node-scratch / /
# Copy app
COPY --from=app /wrk/build ${APP_HOME}
# Copy app dependencies
COPY --from=app /wrk/node_modules ${APP_HOME}/node_modules

### Merge node, app and app dependencies into a single layer
FROM scratch
COPY --from=final / /
EXPOSE 3000
CMD ["/usr/bin/node", "/app/src/index.js"]

