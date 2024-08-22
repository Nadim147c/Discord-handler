FROM oven/bun:1

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN bun install

COPY . .

RUN pnpm run build

CMD ["pnpm", "start"]
