
const cors = require('cors'); 
const express = require('express');
const app = express();app.use(cors());
const morgan = require('morgan');

app.set('port', process.env.PORT_SERVER || 3000);

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//variables globales
app.use((req, res, next) => {
   
    next();
});

// rutas
app.use(require('./routes/index.js'));
app.use(require('./routes/authentication.js'));
app.use(require('./routes/links.js'));
//app.use(require('./routes/user.repository.js'));
// public

app.listen(app.get('port'), () => {
    console.log('servidor en el puerto', app.get('port'));
});

