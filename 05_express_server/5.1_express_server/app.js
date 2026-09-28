
const express = require('express');

const app = express();
const path = require('path');
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    // res.send('Hello, Express');
    res.sendFile(path.join(__dirname, '/index.html'))
});

app.listen(app.get('port'), () => {
    console.log('=> Express is listening on port ',app.get('port'))
})