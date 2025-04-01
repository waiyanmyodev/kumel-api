# Stage 1: Build
FROM node:20-alpine AS build
# Install OpenSSL for Prisma runtime
RUN apk add --no-cache openssl
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# Generate Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the source files
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production
# Install OpenSSL for Prisma runtime
RUN apk add --no-cache openssl
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/ ./

CMD ["npm", "run", "start"]
