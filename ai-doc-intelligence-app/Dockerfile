# Stage 1: Build the React app
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve the app with NGINX
FROM nginx:alpine

# Copy the built React app from the previous stage to the NGINX html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
