FROM node:14.19.0
# Create app directory
WORKDIR /apps/clinic-file
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .

CMD ["sudo","mv","libz.so.1","libz.so.1.old"],["ln","-s","/lib/x86_64-linux-gnu/libz.so.1"]