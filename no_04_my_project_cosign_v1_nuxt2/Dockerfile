FROM node:16.15.0 as build-stage

ARG API_URL
ENV API_URL ${API_URL}
ARG GTM_ID
ENV GTM_ID ${GTM_ID}
ARG AUTH_API_URL
ENV AUTH_API_URL ${AUTH_API_URL}

WORKDIR /www
COPY package*.json ./
RUN yarn install

COPY src ./src
COPY pages ./pages
COPY static ./static
COPY store ./store
COPY plugins ./plugins
COPY layouts ./layouts
COPY nuxt.config.js .
COPY jsconfig.json .
RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 20001
CMD ["yarn", "start"]