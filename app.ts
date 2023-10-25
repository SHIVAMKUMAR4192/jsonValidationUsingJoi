import express from 'express';
const joi = require('joi');
// const express = require('express');
import routes from './routes/userRoutes';

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
