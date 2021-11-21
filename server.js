const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {});
