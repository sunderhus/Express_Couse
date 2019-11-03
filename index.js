//  core modules
const express = require('express');
const path = require('path');
// other modules 
const logger = require('./middleware/logger');
//init app
const app = express();

//inicia middleware(<nome>)
// app.use(logger);

//Parse middleware para json

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//para folder de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
//para um end point acessado , utilzamos um router especifico, no caso, o router de members
app.use('/api/members', require('./routes/api/routeMembers'));


//variaveis de ambiente
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Up... Port: ${PORT}`);
});