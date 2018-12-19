# Build: docker build -f node.dockerfile -t danwahlin/node .

# Option 1
# Start MongoDB and Node (link Node to MongoDB container with legacy linking)
 
# docker run -d --name my-mongodb mongo
# docker run -d -p 3000:3000 --link my-mongodb:mongodb --name nodeapp danwahlin/node

# Option 2: Create a custom bridge network and add containers into it

# docker network create --driver bridge isolated_network
# docker run -d --net=isolated_network --name mongodb mongo
# docker run -d --net=isolated_network --name nodeapp -p 3000:3000 danwahlin/node

# Seed the database with sample database
# Run: docker exec nodeapp node dbSeeder.js

FROM node:11.0.0-alpine

# Create app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

# Install nodemon for hot reload
RUN npm install -g nodemon

COPY package.json .
RUN npm config set registry http://registry.npmjs.org

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./

RUN npm install --no-optional && npm dedupe && npm ls


# Bundle app source
COPY . .

RUN npm run build

ENV PORT 3200
EXPOSE 3200

LABEL maintainer="Evgeny Karpovsky <ekarpovsky@gmail.com>" 

# CMD npm start 
CMD ["node", "dist/index.js"]


