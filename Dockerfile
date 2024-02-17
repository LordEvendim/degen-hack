FROM node:18-alpine
COPY dist/task.js /golem/work/
COPY package.json /golem/work/
VOLUME /golem/work/out
WORKDIR /golem/work
RUN npm install