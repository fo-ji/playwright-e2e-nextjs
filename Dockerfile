FROM mcr.microsoft.com/playwright:v1.17.1-focal

RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

WORKDIR /app

RUN yarn install --frozen-lockfile

# RUN npx playwright install

COPY . .
