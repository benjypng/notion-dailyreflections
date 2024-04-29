FROM --platform=linux/amd64 node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm

RUN pnpm install

COPY . .

CMD pnpm run start
