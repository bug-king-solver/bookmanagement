FROM node:16.16

# Set the working directory to /app
WORKDIR /app

# Install dependencies
COPY ./package*.json /app/
RUN npm install


# Copy the current directory contents into the container at /app
COPY . /app

# Build the Nuxt.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Nuxt.js app
CMD ["npm", "start"]