const express = require('express');
const app = express();
const db= require ('./dbconfig/config')
const port = 3000;
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const cors= require('cors');



// Middleware để xử lý JSON và các middleware khác

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:4200', // Thay đổi thành địa chỉ của Angular
  credentials: true // Cho phép sử dụng cookies qua CORS
}));
// ket noi data
db.connect()

// dùng routes
routes(app);


// Khởi động máy chủ
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
