FROM node:carbon

# Create app directory
RUN mkdir -p /src/app
WORKDIR /src/app


ARG REACT_APP_API_URL

# to make npm test run only once non-interactively
ENV CI=true

# Install app dependencies
COPY package.json /src/app/
RUN npm install && \
    npm install -g pushstate-server

# Bundle app source
COPY . /src/app

# Build and optimize react app
RUN npm run build

EXPOSE 9000

# defined in package.json
CMD [ "npm", "run", "start:prod" ]
