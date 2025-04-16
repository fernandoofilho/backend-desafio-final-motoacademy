# Builder
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build && npm run postbuild

# Runner
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/main"]
