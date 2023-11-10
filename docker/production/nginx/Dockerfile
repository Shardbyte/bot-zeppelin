FROM node:21 AS builder
USER node

COPY --chown=node:node . /zeppelin

WORKDIR /zeppelin/dashboard
RUN ls -lah
RUN pwd
RUN npm ci && npm run build

FROM nginx

ARG API_PORT
ARG DOCKER_PROD_DOMAIN

COPY ./docker/production/nginx/default.conf /etc/nginx/conf.d/default.conf
RUN sed -ir "s/_API_PORT_/${API_PORT}/g" /etc/nginx/conf.d/default.conf
RUN sed -ir "s/_DOCKER_PROD_DOMAIN_/${DOCKER_PROD_DOMAIN}/g" /etc/nginx/conf.d/default.conf

COPY --from=builder /zeppelin/dashboard/dist /var/www
