FROM alpine:3.10

WORKDIR /app

# Install node & npm
RUN apk add nodejs npm sqlite

# Copy & install dependencies
# (performed prior to copying source code to prevent npm install every time source code changes)
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

# Copy source code
COPY . /app

# Start server
CMD npm run start
