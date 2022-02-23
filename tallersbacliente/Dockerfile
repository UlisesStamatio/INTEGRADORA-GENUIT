FROM nginx:1.21.3-alpine

RUN apk add --no-cache tzdata
ENV TZ=America/Lima
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /var/www/html/tallersbacliente

RUN rm -r /etc/nginx/conf.d/default.conf

COPY tallersbacliente.conf /etc/nginx/conf.d/

COPY dist/tallersbacliente /var/www/html/tallersbacliente