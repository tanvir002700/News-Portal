FROM node:10.22.0 as build

MAINTAINER tanvir002700@gmail.com

RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx:1.21-alpine
COPY --from=build /app/build /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
