# build
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npm.taobao.org && npm install --production
COPY public ./public
COPY src ./src
COPY *json *js ./
RUN npm run build

# production
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx","-g", "daemon off;"]
