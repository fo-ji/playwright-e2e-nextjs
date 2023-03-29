## Docker
```sh
$ docker-compose build
```

## NextJS
```sh
$ docker-compose run --rm app yarn create next-app playwright-e2e-nextjs\
&& mv playwright-e2e-nextjs/* . && mv playwright-e2e-nextjs/.* . && rm -r playwright-e2e-nextjs\
```

## install libs
```sh
$ docker-compose up -d
$ docker exec -it app sh
$ yarn add -D @playwright/test
$ npx playwright install
$ yarn add -D tailwindcss postcss autoprefixer
$ yarn tailwindcss init -p
$ yarn add next-auth@4.18.6 @prisma/client@4.8.0 @next-auth/prisma-adapter@1.0.5 date-fns@2.29.3 zustand@4.1.5 zod@3.20.2 @heroicons/react@2.0.13
$ yarn add -D prisma@4.8.0
```

## Prisma
```sh
$ docker-compose up -d
$ docker exec -it app sh
$ npx prisma init
$ npx prisma migrate dev
$ npx prisma generate
```
