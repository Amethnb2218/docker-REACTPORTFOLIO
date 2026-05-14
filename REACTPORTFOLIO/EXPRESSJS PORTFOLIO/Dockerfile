FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY app.js ./
COPY src/ ./src/

ENV USE_MEMORY_DB=true
ENV PORT=5000

EXPOSE 5000

CMD ["node", "app.js"]
