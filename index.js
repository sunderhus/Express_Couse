//  core modules
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
// other modules 
const logger = require('./middleware/logger');
const members = require('./members');
//init app
const app = express();

//inicia middleware(<nome>)
// app.use(logger);

//informa qual é o default layout da view engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Parse middleware para json
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//Homepage
app.get('/', (req, res) => {
    res.render('index', {
        title: "Members APP",
        membersArray: members
    });
});

//para folder de arquivos estáticos, nao se usa junto ao handle bars, ou usa este ou o outro.
app.use(express.static(path.join(__dirname, 'public')));

//para um end point acessado , utilzamos um router especifico, no caso, o router de members
app.use('/api/members', require('./routes/api/routeMembers'));


//variaveis de ambiente
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Up... Port: ${PORT}`);
});