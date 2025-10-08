# This Dockerfile is for building the Expo app for web deployment
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build for web
RUN npx expo export:web

# Production stage with nginx
FROM nginx:alpine

# Copy built files
COPY --from=build /app/web-build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

