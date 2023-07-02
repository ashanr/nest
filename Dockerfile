# Use official Node.js Docker image as the base image
FROM node:18.4.0-alpine

# Create the directory for our app in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the Docker image
COPY package*.json ./

# Install the app dependencies in the Docker image
RUN npm install

# Copy the rest of the app to the Docker image
COPY . .

# Expose port 3000 for the app
EXPOSE 3000

# The command to start the app
CMD [ "npm", "run", "start" ]
