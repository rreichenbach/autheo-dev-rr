FROM node:20-alpine as deps

WORKDIR /app

# Install dependencies needed to compile native modules
RUN apk add --no-cache python3 make g++ libc6-compat

# Copy package.json but NOT package-lock.json (to regenerate it)
COPY package.json ./

# Remove old dependencies and regenerate package-lock.json
RUN rm -rf node_modules package-lock.json && npm install --legacy-peer-deps

# Clean install dependencies including devDependencies
RUN npm ci --verbose

# Builder stage
FROM node:20-alpine as builder

WORKDIR /app

# Set environment variables
ENV NODE_PATH=/app/node_modules
ENV VITE_API_URL=http://localhost:8082

# Copy deps and source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Run build
RUN echo "Running Vite build..." && \
    npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 8084

CMD ["nginx", "-g", "daemon off;"]