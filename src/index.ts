import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
const distPath = path.join(__dirname, '../../client/dist');
app.use(bodyParser.json());

app.use(express.static(distPath));

app.use('/', router);
app.use('/api', router);

app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`
################################################
🛡️  Server listening on port: ${port} 🛡️
################################################
`);
});
