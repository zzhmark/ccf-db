# build
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npm.taobao.org && npm install --production
COPY . .
RUN ${BACKEND_URL:+REACT_APP_API_URL=${BACKEND_URL}} npm run build

# production
FROM nginx:stable
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g", "daemon off;"]
