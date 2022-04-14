FROM nginx:1.21-alpine

COPY docker/nginx/default.conf.template /etc/nginx/conf.d/default.conf.template


COPY docker/nginx/docker-entrypoint.sh /

ENTRYPOINT ["sh", "/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
