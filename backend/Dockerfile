# Используем Node.js как базовый образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код
COPY . .

# Указываем порт, который приложение слушает (опционально)
# EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
