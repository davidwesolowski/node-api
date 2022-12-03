import express from 'express';
import morgan from 'morgan'
import cors from 'cors';
import { protect } from './modules/auth';

import router from './router';
import { createNewUser, signIn } from './handlers/user';

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post('/api/users', createNewUser);

app.post('/api/signin', signIn);

app.use('/api', protect, router);

app.get('/', (req, res) => {
    console.log('hello from express');
    res.status(200);
    res.json({ message: 'hello' });
});

app.use((error, req, res, next) => {
    if (error.type === 'auth') {
        res.status(401);
        res.json({ message: 'unauthorized' });
    } else if (error.type === 'input') {
        res.status(400);
        res.json({ message: 'invalid input' });
    } else {
        res.status(500);
        res.json({ message: 'oops, that is on us' })
    }
});

export default app;