const express = require('express');
const { db } = require('./models');
const routes = require('./routes/attendanceRoutes');

const app = express();

app.use(express.json());

app.use('/api', routes);

db.authenticate()
  .then(() => {
    console.log('Database connected');
    return db.sync({ force: false });
  })
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });