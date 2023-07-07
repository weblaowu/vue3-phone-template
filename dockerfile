FROM nginx

RUN rm /etc/nginx/nginx.conf

USER root

ADD nginx.conf /etc/nginx/

COPY dist/ /usr/share/nginx/html/