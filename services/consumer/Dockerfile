FROM node:8.11.3-alpine
MAINTAINER Anthony Hastings <ar.hastings@gmail.com>

# Installing bash.
RUN apk add --no-cache bash bash-doc bash-completion

# Create a directory (to house our source files) and navigate to it.
WORKDIR /src

# Copy over the bash script to test and wait on the availability of a TCP host and port.
COPY ./wait-for-it.sh /src/
RUN chmod +x /src/wait-for-it.sh

# Copy over the package.json and lock file to the containers working directory.
COPY ./package.json ./package-lock.json /src/

# Install build dependencies (required for node-gyp), install packages then delete build dependencies.
# This is all done in the same command / layer so when it caches, it won't bloat the image size.
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp

# Copy everything in the host folder into the working folder of the container.
COPY ./src /src/