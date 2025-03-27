# Use Node.js
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose NestJS API port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
