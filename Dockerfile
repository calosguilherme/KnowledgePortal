# Estagio 1 - Ser� responsavel em construir nossa aplica��o
FROM node:10.9.0-slim as node
WORKDIR /app
COPY package.json /app/
RUN npm i npm@latest -g
RUN npm install
COPY ./ /app/
RUN npm run build -- --prod

# Estagio 2 - Ser� responsavel por expor a aplica��o
FROM nginx:1.13
COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf