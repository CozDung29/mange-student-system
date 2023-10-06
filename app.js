const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression')
var path = require('path');
require('dotenv').config();
// http://127.0.0.1:3000
const app = express();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
// set up domain 
app.set('port', port);
app.set('host', host);

// setup network security 
app.use(cors());
app.options('*', cors());


// setup compression for increased performance
app.use(compression());

// limit date to post in json 
app.use(bodyParser.json({limit: '50mb'}));

//set up static files
app.use(express.static(path.join(__dirname, './public')));
app.engine('ejs',require('ejs-locals'));
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

app.use('',(req,res)=>{
    res.render('home.ejs');
})

app.listen(app.get('port'), app.get('host'),()=>{
    console.log(`Server is running at http://${app.get('host')}:${app.get('port')}`)
})
