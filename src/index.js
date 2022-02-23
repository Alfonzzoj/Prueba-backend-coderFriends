const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
// Initializations
const app = express();
require('./database');
// Settings 
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', exphbs.engine());

app.set('view engine', '.hbs');
// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mySecretapp',
    resave: true,
    saveUninitialized: true
}));
// Global variables

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
// Static Files
app.use(express.static(path.join(__dirname, 'public')));
// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});