# Multi-stage build for bolt.diy

# Development stage
FROM node:20-alpine AS bolt-ai-development

WORKDIR /app

# Create directories for volumes
RUN mkdir -p /app/data /app/.cache

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 33000

# Command to run the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "33000"]

# Production build stage
FROM node:20-alpine AS bolt-ai-build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS bolt-ai-production

WORKDIR /app

# Create directories for volumes
RUN mkdir -p /app/data /app/.cache

# Copy built assets from the build stage
COPY --from=bolt-ai-build /app/dist ./dist
COPY --from=bolt-ai-build /app/package*.json ./

# Install production dependencies only
RUN npm install --production

# Expose port
EXPOSE 33000

# Command to run the production server
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--port", "33000"]