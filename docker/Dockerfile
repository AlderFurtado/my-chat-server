FROM node:latest
LABEL Alder Furtado
ENV PORT=3002
WORKDIR /usr/app
COPY /server/package*.json ./
RUN npm install
EXPOSE ${PORT}

