import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello Shubh!');
});

app.listen(5000, () => {
    console.log('Server started at http://localhost:5000');
});

