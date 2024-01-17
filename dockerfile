# Use an official Node.js runtime as the base image
# Setup linux layer
# Use Alphine version
FROM node:18.17.0 as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install serve -g

# Copy the rest of your application code to the container
COPY . .

# Build your React app
RUN npm run build

# Expose the port your React app will run on
EXPOSE 3000

# Define the command to run your React app
CMD ["npx", "serve", "-s", "build"]

# --build-arg NODE_VERSION=8
