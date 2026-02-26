# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage - Multi-service container
FROM node:24-alpine

# Install nginx
RUN apk add --no-cache nginx

WORKDIR /app

# Copy built frontend assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy API server
COPY server /app/server
WORKDIR /app/server
RUN npm install --production

# Create articles directory for volume mount
RUN mkdir -p /usr/share/nginx/html/articles

# Copy nginx configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Copy supervisor configuration to run both nginx and node
COPY supervisord.conf /etc/supervisord.conf

# Install supervisor
RUN apk add --no-cache supervisor

# Expose ports
EXPOSE 80

# Start supervisor to manage both services
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
