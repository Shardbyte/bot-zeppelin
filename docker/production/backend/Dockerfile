FROM node:21
USER node

COPY --chown=node:node . /zeppelin

WORKDIR /zeppelin/backend
RUN npm ci && npm run build
