FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
RUN yarn install --frozen-lockfile
COPY ./src ./src
RUN yarn build


FROM node:18-alpine AS server

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY --from=builder ./app/build ./build

EXPOSE 8080

CMD ["npm", "start"]
