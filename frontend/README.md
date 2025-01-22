# Weather-Forecast
register/login react.js, nest.js, postgreSQL, JWT, https://openweathermap.org/, https://www.chartjs.org/, https://apexcharts.com/. 



Заменить MONGO db на PostgreSQL (локальную БД) с использованием Nest.js 
чтобы запросы с FE шли обработчику запросов в BE и он переносил запрос на PostgreSQL 

# Weather App

## Встановлення залежностей

Для коректної роботи програми необхідно встановити такі залежності:

``` bash
npm install
````
Якщо при запуску будуть проблеми, то рекомендуються індивідуально встановити/оновити залежності:
``` bash
npm install react-scripts
npm install concurrently --save-dev
npm install react-accessible-accordion
npm install react-select-async-paginate
npx browserslist@latest --update-db
npm install webpack-dev-server@latest
npm install cors
npm install bcryptjs
npm install jsonwebtoken
npm install nodemailer
````



npm install @nestjs/typeorm typeorm pg bcrypt @nestjs/passport passport passport-jwt jsonwebtoken
npm install --save-dev @types/passport-jwt



## Запуск проекту

### Основний запуск

Для одночасного запуску фронтенду (FE) та бекенду (BE) виконайте наступну команду в терміналі:

``` bash
npm run start
````

### Альтернативний запуск (окремо)

Ви також можете запускати FE та BE окремо за допомогою наступних команд:

- Запуск клієнтської частини (Frontend):

 ``` bash
 npm run start-front
 ````

- Запуск серверної частини (Backend):

 ``` bash
 npm run start-back
 ````

Після успішного запуску відкриється посилання на програму:

````
http://localhost:3000/login
````

## Функціонал програми

- Реєстрація користувачів.
- Авторизація користувачів.
- пошук міст.
- Перегляд поточної погоди для вибраного міста.
- Прогноз погоди на тиждень (з понеділка до неділі).

## Підключення до MongoDB Atlas

### Інструкція з підключення

1. Встановіть десктопну програму MongoDB Compass (версії 1.12 або вище).
2. У головному вікні натисніть **Add new connection**.
3. У полі URL вставте посилання:

 ````
 mongodb+srv://<db_username>:<db_password>@weather-app.cltrc.mongodb.net/
 ````

 Замініть такі параметри:
 - `<db_username>`: **new_user01**
 - `<db_password>`: **lbY467f50Cag23q9**

 Підсумкове посилання виглядатиме так:

 ````
 mongodb+srv://new_user01:lbY467f50Cag23q9@weather-app.cltrc.mongodb.net/
 ````

4. Натисніть зелену кнопку **Save and Connect**.

5. Після підключення у лівій частині вікна з'явиться з'єднання `weather-app.cltrc.mongodb.net`.

6. Відкрийте вкладку `weather-app.cltrc.mongodb.net`, потім виберіть кластер `test` та перейдіть до таблиці `UserInfo`. Тут зберігається інформація про зареєстрованих користувачів.

# Якщо підключитись не буде можливості то альтернатива - налаштування MongoDB Atlas.

# Створення кластера в MongoDB Atlas

Цей посібник допоможе вам створити кластер у MongoDB Atlas. Дотримуйтесь наведених нижче кроків, щоб налаштувати свій кластер і підключитися до нього.

## Вимоги

- Активний обліковий запис MongoDB Atlas (створити можна [тут](https://www.mongodb.com/cloud/atlas)).
- Браузер для доступу до веб-консолі.

## Кроки для створення кластера

### 1. Реєстрація або вхід у MongoDB Atlas

1. Перейдіть на [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Якщо у вас ще немає облікового запису, натисніть **"Sign Up"** і дотримуйтесь інструкцій для створення облікового запису.
3. Якщо у вас вже є обліковий запис, натисніть **"Login"** і увійдіть.

### 2. Створення нового проекту

1. Після входу в систему натисніть на кнопку **"New Project"**.
2. Введіть назву проекту і натисніть **"Create Project"**.

### 3. Створення кластера

1. У вашому новому проекті натисніть на **"Build a Cluster"**.
2. Виберіть тип кластера:
   - **Shared Cluster** (безкоштовний): оберіть опцію "Shared" для безкоштовного кластера.
   - **Dedicated Cluster**: оберіть конфігурацію з відповідними параметрами для платного кластера.
3. Виберіть провайдера хмарних послуг та регіон розміщення.
4. Налаштуйте додаткові параметри (опціонально) та натисніть **"Create Cluster"**.

### 4. Налаштування доступу до бази даних

1. У вкладці **"Database Access"** додайте нового користувача, натиснувши **"Add New Database User"**:
   - Введіть ім'я користувача та пароль.
   - Виберіть права доступу (рекомендується **"Read and write to any database"** для початкових налаштувань).
   - Натисніть **"Add User"**.

### 5. Додавання IP-адрес для підключення

1. У вкладці **"Network Access"** додайте IP-адресу, натиснувши **"Add IP Address"**:
   - Виберіть **"Allow Access from Anywhere"** або додайте конкретну IP-адресу.
   - Натисніть **"Confirm"**.

### 6. Підключення до кластера

1. У вкладці **"Clusters"** натисніть **"Connect"** біля вашого кластера.
2. Виберіть метод підключення (наприклад, через MongoDB Compass або за допомогою драйвера).
3. Скопіюйте наданий URI підключення та використовуйте його у вашому додатку або клієнті.

### 7. Налаштування підключення у файлі `index.js`

1. Запишіть `password` та `username`.
2. Замініть URL на ваші `username`, `password` та назву кластера.
3. Замініть посилання у кореневому файлі `index.js` на ваш URL:
   ```javascript
   const mongoUrl = "mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/?retryWrites=true&w=majority&appName=YourAppName";
   ```

   Наприклад:
   ```javascript
   const mongoUrl = "mongodb+srv://shtepa:16h74xnfB1gQNWGE@weather-app.cltrc.mongodb.net/?retryWrites=true&w=majority&appName=Weather-app";
   ```
4. Запустіть npm run start або npm run start-back.
5. Бачите в терміналі текст Connected to database - значить працює База Даних
