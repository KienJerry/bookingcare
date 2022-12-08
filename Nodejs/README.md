# Dự Án Khám Bệnh
## Các Packages sử dụng trong dự án

npm -v 6.14.13
yarn -v 1.22.18
node -v v14.17.3

## Cài đặt dự án

1. Run:
npm install or yarn install

2. Copy biến ".env.example" -> tạo biến mới có tên là ".env"

3. Tạo bảng database mới : đặt tên là database.sql
(Create the database: open Mysql Workbench or PHP myadmin or any database management system, run the "database.sql" in the "database" folder.
It will automatically create a new schema, name "doctorcare" in your database. )

4. Cập nhật biến ".env"
- If you use "no-password" to login to your database, this variable "DB_PASSWORD" will be blank, otherwise, provide your password.
Default, I use the root account. If you use other accounts, change the "DB_USERNAME" variable.
- With the variable "MAIL_USERNAME", is your email 
"MAIL_PASSWORD" is your email app password (not your email's password). you need to generate one here: https://myaccount.google.com/apppasswords
( Select App: Mail, Select Device: Windows Computer -> Generate )


6. Sau đó chạy
npm start or yarn start

7. Enjoy!


## Lệnh chạy migration
npx sequelize-cli db:migrate

## Lệnh chạy Seeder (Dữ liệu hard)
npx sequelize-cli db:seed:all

## Hướng dẫn setUp server
https://www.bezkoder.com/node-js-express-sequelize-mysql/