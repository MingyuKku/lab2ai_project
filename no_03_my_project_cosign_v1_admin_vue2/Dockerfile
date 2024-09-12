FROM node:12.18.3 as build-stage

WORKDIR /www
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:stable-alpine as production-stage
COPY docker-nginx-prod.conf /temp/prod.conf
RUN envsubst /www < /temp/prod.conf > /etc/nginx/conf.d/default.conf
COPY --from=build-stage /www/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]