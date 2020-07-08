FROM nginx:1.19.0-alpine
ENV SOCKET_URL=http://128.199.252.245:3002/
ENV API_URL=http://128.199.252.245:3001/mc/v1/users
COPY ./build /usr/share/nginx/html
EXPOSE 80