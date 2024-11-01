# Use a specific version of Node.js
FROM node:20.17

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY backend/package.json backend/package-lock.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the backend files
COPY backend/ ./

# Expose the app's port
EXPOSE 5000

# Start the Node.js application
CMD ["node", "server.js"]  # Adjust to your server entry point
