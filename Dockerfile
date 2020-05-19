FROM node:12.16.3

RUN mkdir -p /src/app

WORKDIR /src/app

COPY ./public /src/app/public

COPY ./server /src/app/server

COPY ./package.json /src/app

RUN npm install

EXPOSE 3002

CMD [ "npm", "run", "server" ]
