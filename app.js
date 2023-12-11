const express = require('express');
const cors = require('cors');
const compression = require('compression'); 
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
// const connect = require('connect-pg-simple');

const app = express();

const port = 3000;
const host = '127.0.0.1';

app.set('port', port);
app.set('host', host);

//set network security for deployed
app.use(cors());
app.options('*', cors());

//zip
app.use(compression());

app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');
 

const admin = new AdminJS({})
admin.watch();

const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
}
const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
}
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
    },
    null,
    {
      
      resave: false,
      saveUninitialized: true,
        }
  )

  app.get('/admin', adminRouter)

app.listen(app.get('port'), app.get('host'), () => {   
    console.log('server listening on port http://127.0.0.1:3000');
});

