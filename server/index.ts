import express, { Request, Response } from 'express';
import next from 'next';
import router from './routes';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 9000;

(async () => {
    try {
        await app.prepare();
        const server = express();
        server.use('/', router);
        server.use('/api', router);

        server.get('/', (req, res) => {
            return app.render(req, res, '/');
        });

        server.all('*', (req: Request, res: Response) => {
            return handle(req, res);
        });
        server.listen(port, (err?: any) => {
            if (err) throw err;
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
