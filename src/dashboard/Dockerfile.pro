# Use a smaller base image for production
FROM node:16.16-alpine

# Set the working directory to /app
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the current directory contents into the container at /app
COPY . .

# Build the Nuxt.js application
RUN npm run build

RUN npm run generate
# Expose the port the app runs on (if needed, depends on your Nuxt.js configuration)
EXPOSE 3000

# Start the Nuxt.js app in production mode
CMD ["npm", "start"]
