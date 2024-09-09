const express = require('express');
const studentRoutes = require('./routers/StudentRouters');
const app = express();

// Middleware để xử lý JSON
app.use(express.json());

// Sử dụng route /api/students
app.use('/api', studentRoutes);

// Cấu hình cổng
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
