FROM node:18.15.0-bullseye

WORKDIR /app

RUN yarn install --frozen-lockfile

RUN npx playwright install && \
    npx playwright install-deps

COPY . .
