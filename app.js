const express = require('express');
const dotenv = require('dotenv');
const studentRoutes = require('./routes/studentRoutes');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api', studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
