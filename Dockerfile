FROM node as client

WORKDIR /usr/app/client/

COPY client/package*.json ./

RUN yarn

COPY client/ ./

RUN yarn build

FROM node:carbon

WORKDIR /usr/app/

COPY --from=client /usr/app/client/build/ ./client/build/

WORKDIR /usr/app/server/

COPY server/package*.json ./

RUN npm install

COPY server/ ./

EXPOSE 8080
CMD [ "npm", "start" ] 