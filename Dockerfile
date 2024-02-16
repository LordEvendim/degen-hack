FROM node:18-alpine
COPY dist/task.js /golem/work/
VOLUME /golem/input
WORKDIR /golem/work