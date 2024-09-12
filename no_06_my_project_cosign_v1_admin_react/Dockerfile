# Build stage
FROM node:18.18.0 as build-stage
WORKDIR /www
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build


# Production stage
FROM nginx:stable-alpine as production-stage
# Remove default configuration files
RUN rm /etc/nginx/conf.d/*
# Copy the custom Nginx configuration file
COPY docker-nginx-prod.conf /etc/nginx/conf.d/default.conf
# Copy the build output to the Nginx html directory
COPY --from=build-stage /www/build /usr/share/nginx/html
# Expose the necessary port
EXPOSE 22003
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]