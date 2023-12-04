FROM node:15-alpine3.17 as build

COPY /react-app /react_app

WORKDIR /react_app

RUN npm install && CI=false && npm run build
