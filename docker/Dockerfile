FROM node:latest
LABEL Alder Furtado
ENV PORT=3000
COPY /server /VAR/WWW
WORKDIR /VAR/WWW
RUN npm install
ENTRYPOINT ["npm", "start"]
EXPOSE ${PORT}

