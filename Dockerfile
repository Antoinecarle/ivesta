FROM node:22-slim AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY server/package*.json ./server/
RUN npm install --legacy-peer-deps && cd server && npm install

# Copy source files
COPY . .

# Build frontend
RUN npm run build

# Production stage
FROM node:22-slim
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/package.json ./

# Install production server deps only
RUN cd server && npm install --production

ENV NODE_ENV=production
ENV PORT=3008

EXPOSE 3008

CMD ["node", "server/index.js"]
