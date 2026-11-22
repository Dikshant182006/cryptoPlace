# We get an image from this file
FROM node:22-alpine

WORKDIR /app

COPY Backend/package*.json ./

RUN npm ci --omit=dev

COPY Backend/ ./

CMD ["node", "server.js"]
