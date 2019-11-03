const moment = require('moment');
// criando estrutura do middleWare para logar solicitaçoes
const logger = (req, res, next) => {
    console.log(`
    Url requisitada :  ${req.protocol}://${req.get('host')}${req.originalUrl}
    Horário da solicitação : ${moment().format()}
    `);
    next();
}

module.exports = logger;