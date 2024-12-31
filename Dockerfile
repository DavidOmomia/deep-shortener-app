# Use Node.js as the base image
FROM node:18-slim

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install a lightweight static file server and dependencies
RUN npm install -g serve && npm install

# Declare build arguments for environment variables
ARG VITE_APP_BASE_URL
ARG VITE_API_BASE_URL

# Set environment variables for Vite
ENV VITE_APP_BASE_URL=$VITE_APP_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Debug: Print environment variables to verify during build
RUN echo "VITE_API_BASE_URL=$VITE_API_BASE_URL" && \
    echo "VITE_APP_BASE_URL=$VITE_APP_BASE_URL"

# Copy the rest of the application
COPY . .

# Build the application for production
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the static server
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
