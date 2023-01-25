FROM arm32v7/nginx:latest

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY . /usr/share/nginx/html
#COPY ./static /usr/share/nginx/html/static

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 81