const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
    
    // req.params.id is the ID number of the selected item
    // will also need to make a get request to the database
    // the database will tell me what media the selected item has
    // a query to AWS will get specific links to media
});

app.listen(3010, function() {
    console.log('listening')
});
