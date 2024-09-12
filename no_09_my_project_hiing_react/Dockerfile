FROM node:16.15.0 as build-stage

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL ${REACT_APP_API_URL}
ARG REACT_APP_API_CHAT_URL
ENV REACT_APP_API_CHAT_URL ${REACT_APP_API_CHAT_URL}
ARG REACT_APP_IMAGE_URL
ENV REACT_APP_IMAGE_URL ${REACT_APP_IMAGE_URL}
# ARG REACT_APP_CHARACTER_CHAT_SOCKET_URL
# ENV REACT_APP_CHARACTER_CHAT_SOCKET_URL ${REACT_APP_CHARACTER_CHAT_SOCKET_URL}

WORKDIR /www
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:stable-alpine as production-stage
COPY docker-nginx-prod.conf /temp/prod.conf
RUN envsubst '${REACT_APP_API_URL} ${REACT_APP_API_CHAT_URL} ${REACT_APP_IMAGE_URL}' < /temp/prod.conf > /etc/nginx/conf.d/default.conf
COPY --from=build-stage /www/build /usr/share/nginx/html
# EXPOSE 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]