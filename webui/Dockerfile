FROM node:20-alpine as deps

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with increased verbosity
RUN npm ci --verbose

# Development stage for TypeScript checking
FROM node:20-alpine as ts-check

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Run TypeScript compilation with full error reporting
RUN npx tsc --noEmit --pretty --listFiles --listEmittedFiles --diagnostics

# Builder stage
FROM node:20-alpine as builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variable for more verbose build output
ENV NODE_ENV=development
ENV DEBUG=vite:*

# Split the build command to see where it fails
RUN echo "Running TypeScript compilation..." && \
    npx tsc --listFiles --diagnostics || exit 1 && \
    echo "Running Vite build..." && \
    npx vite build --debug

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]