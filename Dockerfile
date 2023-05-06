# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn

# Copy the rest of the application's code to the container
COPY . .

# Build the application
RUN yarn build

# Expose port 3000
EXPOSE 5173

# Run the application
CMD ["yarn", "dev"]