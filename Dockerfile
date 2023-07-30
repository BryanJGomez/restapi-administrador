FROM node:16.16.0
RUN apt-get update --fix-missing
RUN apt-get install -f
RUN apt-get install -y software-properties-common
RUN apt-get install -y build-essential
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install && npm cache clean --force
RUN npm install -g pm2
COPY ./ /usr/src/app
CMD ["pm2-runtime","index.js"]