FROM node:erbium-alpine3.12 as builder

# set the working dir for container
WORKDIR /frontend

# copy the project files
COPY . .

# install npm dependencies
RUN npm ci

# build the project
RUN npm run build

FROM caddy:2.1.1-alpine as server

COPY --from=0 /frontend/out /usr/share/caddy
COPY --from=0 /frontend/Caddyfile /etc/caddy/Caddyfile

RUN du -hs /usr/share/caddy
