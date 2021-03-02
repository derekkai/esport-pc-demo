FROM nginx

WORKDIR /app

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist/ /app/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]