FROM node:14
WORKDIR /home/fmcd/ccf-db
COPY package*.json ./
RUN npm config set registry https://registry.npm.taobao.org && npm install -g serve && npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["serve","-s", "build"]
