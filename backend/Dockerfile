FROM node:20-alpine

WORKDIR /app

# install deps
COPY package*.json ./
RUN npm install

# copy source
COPY . .

# build typescript
RUN npm install

EXPOSE 5000

CMD ["npm", "run" , "dev"]
