FROM node:lts-alpine3.13 AS development

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm install glob rimraf

RUN npm i --only=development

COPY . .

RUN npm run build

FROM node:lts-alpine3.13 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3333

CMD ["node", "dist/main"]
