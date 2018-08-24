FROM node:10.9-alpine
MAINTAINER Anthony Hastings <ar.hastings@gmail.com>

# Create a directory (to house our source files) and navigate to it.
WORKDIR /src

# Installing dockerize which can test and wait on the availability of a TCP host and port.
ENV DOCKERIZE_VERSION v0.6.1
RUN apk add --no-cache openssl \
    && wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Installing bash.
RUN apk add --no-cache bash bash-doc bash-completion

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

# Expose the specified port back to the host machine.
EXPOSE 8080
