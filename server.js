const express = require('express');
const path = require('path');
const https = require('https');
const config = require('./config');
const fs = require('fs');

const app = express();
const server = https.createServer({
    key: fs.readFileSync(config.ssl.key, 'utf8'),
    cert: fs.readFileSync(config.ssl.cert, 'utf8')
}, app);

app.use(express.static(path.resolve(__dirname, './public/dist')));
app.get('*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'public/dist/index.html'));
});

if (require.main === module) {
    server.listen(3030, (err) => {
        if (err) {
            throw new Error(err);
        }
        console.log('Server running on port 3030');
    });
} else {
    module.exports = {
        run() {
            return new Promise((resolve, reject) => {
                const httpListener = server.listen({
                    hostname: 'localhost',
                    port: 0
                }, (err) => {
                    if(err){
                        return reject(err);
                    }
                    return resolve(httpListener.address().port);
                });
            });
        }
    };
}