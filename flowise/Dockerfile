FROM node:18-alpine

WORKDIR /usr/src/app

# Install system dependencies
RUN apk add --no-cache python3 make g++ curl

# Install app dependencies
COPY package*.json ./
RUN npm install

# Install vector database client packages
RUN npm install @milvus/node-sdk @qdrant/js-client-rest redis @elastic/elasticsearch chromadb

# Bundle app source
COPY . .

# Build the application
RUN npm run build

EXPOSE 13000
ENV PORT=13000
ENV HOST=0.0.0.0
ENV FLOWISE_USERNAME=admin
ENV FLOWISE_PASSWORD=password

# Vector database connection environment variables
ENV MILVUS_URL=milvus:19530
ENV QDRANT_URL=http://qdrant:6333
ENV REDIS_URL=redis://redis:6379
ENV ELASTICSEARCH_URL=http://elasticsearch:9200
ENV CHROMA_URL=http://chroma:8000

CMD [ "npm", "start" ]