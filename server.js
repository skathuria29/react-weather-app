const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static('public'));

// send the user to index html page inspite of the url


app.listen(PORT, function(){
    console.log(`App is running on port ${PORT}`);
});