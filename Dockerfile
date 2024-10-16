# Build stage for React frontend
FROM node:14-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Final stage for Node.js backend
FROM node:14-alpine
WORKDIR /usr/src/app

# Copy backend files
COPY package*.json ./
RUN npm install
COPY . .

# Copy built frontend from previous stage
COPY --from=frontend-build /app/frontend/build ./frontend/build

EXPOSE 3000

CMD ["node", "app.js"]
