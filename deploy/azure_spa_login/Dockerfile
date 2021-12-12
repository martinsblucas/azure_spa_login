FROM node:14.17.3

ENV TZ=America/Sao_Paulo

WORKDIR /usr/src/azure_spa_login

RUN npm install -g npm

RUN npm install -g @vue/cli@4.5.13

COPY ./azure_spa_login/package.json .

RUN npm install

COPY ./azure_spa_login/. .

CMD ["npm", "run", "serve", "--host", "0.0.0.0", "--port", "8080"]

EXPOSE 8080