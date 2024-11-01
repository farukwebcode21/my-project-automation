# Stage 1: Build the React app
FROM node:20.17 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY frontend/package.json frontend/package-lock.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the frontend files
COPY frontend/ ./

# Build the React app
RUN pnpm run build

# Stage 2: Serve the React app
FROM nginx:alpine

# Copy the build files to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start container
CMD ["nginx", "-g", "daemon off;"]
