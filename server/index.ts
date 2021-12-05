import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import next from 'next';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const path = require('path');
const port = process.env.PORT || 8080;
const distPath = path.join(__dirname, '../../client/public');

app.prepare().then(() => {
    const server = express();

    server.use(express.static(distPath));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    server.use('/', router);
    server.use('/api', router);

    server.get('/', (req, res) => {
        return app.render(req, res, '/');
    });

    server.get('*', (req, res) => {
        handle(req, res);
    });

    server.listen(port, () => {
        console.log(`
################################################
🛡️  Server listening on port: ${port} 🛡️
################################################
`);
    });
});
