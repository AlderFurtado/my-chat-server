FROM node:13-alpine
WORKDIR /app
# Adicionando `/app/node_modules/.bin` para o $PATH
ENV PATH /app/node_modules/.bin:$PATH
# Instalando dependências da aplicação e armazenando em cache.
COPY /client/package.json ./

RUN npm install --silent
RUN npm install react-scripts@3.3.1 -g --silent

COPY /client ./
# Inicializa a aplicação
CMD ["npm", "start"]