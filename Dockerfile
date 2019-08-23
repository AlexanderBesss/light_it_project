# FROM node:latest

# Папка приложения
# ARG APP_DIR=app
# RUN mkdir -p ${APP_DIR}
# WORKDIR ${APP_DIR}

# Установка зависимостей
# COPY package*.json ./
# RUN npm install
# Для использования в продакшне

# Копирование файлов проекта
# COPY . .

# Уведомление о порте, который будет прослушивать работающее приложение
# EXPOSE 3000

# Запуск проекта
# CMD ["npm", "start"]

# CMD ["serve", "-s", "dist", "-p", "8080"]
# CMD ["npm", "start"]
# CMD [ "node", "build/main.js" ]

FROM node:10
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .
RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main.js" ]