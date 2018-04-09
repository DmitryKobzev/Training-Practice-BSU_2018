var express = require('express');
var app = express();

app.use('/', express.static('public/task3/UI'));

app.listen(3000, function () {
    console.log('listen 3000 port');
});