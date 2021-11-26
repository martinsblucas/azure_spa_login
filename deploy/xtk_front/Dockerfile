FROM node:14.17.3

ENV TZ=America/Sao_Paulo

WORKDIR /usr/src/xtk_front

RUN npm install -g npm

RUN npm install -g @vue/cli@4.5.13

COPY ./xtk_front/package.json .

RUN npm install

COPY ./xtk_front/. .

CMD ["npm", "run", "serve", "--host", "0.0.0.0", "--port", "8080"]

EXPOSE 8080