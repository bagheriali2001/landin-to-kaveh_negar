# Docker file for building the image, node js using yarn
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# Bundle app source
COPY . .

# Expose port PORT from environment variable
EXPOSE $PORT

# Run the app
CMD [ "yarn", "start" ]