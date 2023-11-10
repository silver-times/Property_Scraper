ARG NODE_VERSION=20.2.0
ARG PNPM_VERSION=8.6.5

FROM node:${NODE_VERSION}-alpine as base

RUN npm install -g pnpm@${PNPM_VERSION}

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm i

COPY . .

# RUN pnpm run build

EXPOSE 8080

CMD ["pnpm", "run", "dev"]
