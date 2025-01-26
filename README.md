# Додаток для прогнозування погоди
Цей проект - це повностековий додаток для прогнозування погоди, побудований 
на React.js для фронтенду та Nest.js з PostgreSQL для бекенду.

## Функціонал програми

- Реєстрація користувачів.
- Авторизація користувачів.
- Інпут з автокомплітом міст
- пошук міст.
- Перегляд поточної погоди для обраного міста.
- Прогноз погоди на тиждень (з понеділка до неділі).
- перегляд прогнозу погоди на день/5 днів.
- перегляд прогнозу погоди погодинно на поточний день.
- графік температури на поточний день та на 5 днів.
- отримання прогнозу погоди за IP користувача.
- прелоадери під час запиту IP користувача на пошук міста прогнозу погоди.
- створення блоків міст з прогнозом погоди (максимум 5).

## Необхідні умови
- Node.js (v14 або новіша версія)
- npm (v6 або новіша версія)
- Docker (для запуску PostgreSQL)

## Налаштування проекту
### 1. Клонування сховища
```bash
git clone https://github.com/Ivan-hot/Weather-Forecast
cd Прогноз погоди
```
### 2. Налаштування змінних середовища
Переконайтеся, що ви налаштували необхідні змінні оточення. Ви можете використовувати надані файли .env у каталогах фронтенду та бекенду як шаблони.

### 3. Встановіть залежності
Створіть два термінали, один каталог буде фронтендом, другий - бекендом. 
Перейдіть до обох каталогів frontend і backend та встановіть залежності:
```bash
cd frontend
npm install
```
```bash
cd backend
npm install
```
## Міграції баз даних

### 1. Створення міграції: Щоб створити нову міграцію, скористайтеся наступною командою. Замініть <MigrationName> описовою назвою вашої міграції.
```bash
cd backend
npm виконати migration:create --name=<Назва міграції>
```
### 2. Створіть міграцію: Якщо ви внесли зміни до ваших сутностей і хочете згенерувати міграцію на основі цих змін, використовуйте
```bash
npm виконати migration:generate
```
### 3. Запустіть міграції: Щоб застосувати всі відкладені міграції до вашої бази даних, виконайте
```bash
npm run migration:run
```
### (НЕОБОВ'ЯЗКОВО) 4. Відмінити міграції: Якщо вам потрібно скасувати останню міграцію, ви можете виконати
```bash
npm run migration:revert
```
### (НЕОБОВ'ЯЗКОВО) 5. Показати міграції: Щоб переглянути всі міграції та їх статус, використовуйте:
```bash
npm run migration:show
```
### 6. База даних PostgreSQL з Docker
Файл docker-compose.yml вже налаштовано для створення бази даних PostgreSQL. Переконайтеся, що Docker запущено, а потім запустіть базу даних за допомогою
```bash
cd backend
docker-compose up -d
```
База даних налаштована для роботи на порту 5441 (зіставлений з портом PostgreSQL за замовчуванням 5432 всередині контейнера). Підключитися до неї можна за допомогою облікових даних, вказаних у файлі 
## файлі docker-compose.yml
## Ім'я користувача: vano
## Пароль: password123
## Назва бази даних: weather_db
Конфігурація ORM у файлі ormconfig.json визначає деталі підключення та шляхи для сутностей і міграцій. 

### Запуск програми
Ви можете одночасно запустити як фронтенд, так і бекенд сервери:

## 1. Фронтенд
Відкрийте нове вікно терміналу і запустіть:
```bash
cd frontend
npm run start start
```
## 2. Backend
```bash
cd backend
npm run start:dev
```
## Доступ до додатку
Після запуску обох серверів ви можете отримати доступ до додатку, перейшовши за адресою http://localhost:3000/login у вашому веб-браузері.

## Структура проекту
### Проект поділяється на дві основні частини: фронтенд та бекенд. Кожна частина відіграє певну роль у загальній функціональності додатку.

## Backend (NestJS)
### Каталог src Містить основний код програми.
### app.controller.ts Визначає основний контролер для обробки HTTP-запитів.
### app.module.ts Визначає кореневий модуль, який імпортує інші модулі та налаштовує додаток.
### app.service.ts Надає сервіси, які можна вставляти в контролери.
### auth Директорія Керує логікою автентифікації, включаючи керування токенами JWT.
### user Керує операціями, пов'язаними з користувачами, такими як отримання даних про користувача.
### Файли конфігурації:
### .env Зберігає змінні оточення.
### ormconfig.json Налаштовує TypeORM для взаємодії з базами даних.
### tsconfig.json & tsconfig.build.json Файли конфігурації TypeScript для компіляції коду.
## Docker та розгортання
### Dockerfile Визначає образ Docker для бекенда.
### docker-compose.yml Налаштовує служби Docker для розробки та розгортання.
## Фронтенд (React)
### src Директорія Містить основний код React-додатку.
### App.js Основний компонент, який налаштовує маршрутизацію та контекст додатку.
### Каталог api Містить утиліти API для виконання HTTP-запитів.
### components Каталог містить багаторазові UI-компоненти, такі як HourlyForecastWidget.
### pages Директорія Містить компоненти сторінок, які відповідають різним маршрутам, такі як вхід користувача та відображення погоди.
### styles Містить файли CSS для стилізації програми.
## Файли конфігурації:
### .env Зберігає змінні оточення для фронтенду.
### package.json Перелічує залежності та скрипти для побудови та запуску фронтенду.

## Як працює проект
## Взаємодія з користувачами.
### Користувачі взаємодіють з фронтендом через веб-браузер. Вони можуть авторизуватися, переглядати прогнози погоди.
## Взаємодія з API:
### Фронтенд взаємодіє з бекендом через кінцеві точки RESTful API. Він надсилає запити для отримання погодних даних.
## Аутентифікація:
### Бекенд обробляє автентифікацію користувачів за допомогою JWT. Він перевіряє токени для захищених маршрутів та керує сесіями користувачів.
## Управління даними:
### Бекенд взаємодіє з базою даних PostgreSQL для зберігання інформації про користувачів. Він використовує TypeORM для операцій з базою даних.
## Розгортання:
### Додаток може бути контейнеризований за допомогою Docker, що дозволяє легко розгортати та масштабувати його.
