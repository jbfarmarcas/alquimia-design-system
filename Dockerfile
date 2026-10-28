FROM node:22-bookworm-slim

WORKDIR /app

RUN npm install -g pnpm@10.4.1

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY nuxt.config.ts tsconfig.json ./
COPY app ./app
COPY playground ./playground

RUN pnpm install --frozen-lockfile

ENV HOST=0.0.0.0
ENV PORT=3010
ENV CHOKIDAR_USEPOLLING=true

EXPOSE 3010

CMD ["pnpm", "exec", "nuxt", "dev", "playground", "--host", "0.0.0.0", "--port", "3010"]
