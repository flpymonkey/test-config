# Use an official Node.js runtime as a parent image
FROM node:current-alpine3.16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files to the working directory
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN npm install -g pnpm@9.15.4 \
    && pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN pnpm build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
