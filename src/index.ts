import dotevn from 'dotenv';
import config from './config';

dotevn.config();

import app from './server';

app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
})