FROM node:20-alpine as deps

WORKDIR /app

# Copy package files
COPY package*.json ./

# Clean install dependencies including devDependencies
RUN npm cache clean --force && \
    rm -rf node_modules && \
    npm install --verbose --include=dev

# Builder stage
FROM node:20-alpine as builder

WORKDIR /app

# Set environment variables
ENV NODE_PATH=/app/node_modules
ENV NODE_ENV=development
ENV VITE_API_URL=http://localhost:8082

# Copy deps and source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Run Vite build with Node flags for ES modules
RUN node --experimental-modules --experimental-json-modules \
    ./node_modules/vite/bin/vite.js build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 8084

CMD ["nginx", "-g", "daemon off;"]