import express from 'express';
// const joi = require('joi');
// const express = require('express');
import routes from './routes/userRoutes';
import http from 'http';



const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use('/api', routes);

const server = http.createServer(app);


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
