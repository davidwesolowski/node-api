import dotevn from 'dotenv';

dotevn.config();

import config from './config';

import app from './server';

app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
})