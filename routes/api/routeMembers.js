const express = require('express');
const uuid = require('uuid');
const members = require('../../members');
const router = express.Router();

//Retorna Json de todos os membros
router.get('/', (req, res) => {
    res.json(members);
});

//Retorna Json do membro pelo id
router.get('/:id', (req, res) => {
    let found;
    found = members.some(member => member.id === req.params.id);
    if (found) {
        res.json((members).filter(member => member.id === req.params.id));
    } else {
        res.status(400)
            .json({
                msg: `Não existe nenhum membro com o id informado de ${req.params.id}`
            });
    }
});

//Adiciona membro
router.post('/', (req, res) => {
    //creat a new member
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({
            msg: `Por favor , inclua um email e nome para o novo membro.`
        });
    }
    // adiciona ao array existente, nao persiste
    members.push(newMember);
    // retorna todos com o novo mebro passado.
    // res.json(members);

    //retorna ao form do template
    res.redirect('/');
});

//Atualiza membros
router.put('/:id', (req, res) => {
    //verifica se ja existe
    const found = members.some(member => member.id === req.params.id);

    if (found) {
        const newInfos = req.body;
        members.forEach(member => {
            if (member.id === req.params.id) {
                member.id = newInfos.id ? newInfos.id : member.id;
                member.age = newInfos.age ? newInfos.age : member.age;
                member.email = newInfos.email ? newInfos.email : member.email;
                res.json({
                    msg: `membro alterado com sucesso`,
                    infos: member
                });
            }
        });
    } else {
        res.status(400).json({
            msg: `nao foi encontrado nenhum cadastro com o id passado de ${req.params.id}`
        })
    }
});

//Deleta membro
router.delete('/:id', (req, res) => {
    //verifica existe alguem com este ID
    const found = members.some(member => member.id === req.params.id);

    if (found) {
        let i = 0;
        members.forEach(member => {
            if (member.id === req.params.id) {
                members.splice(i, 1);
                res.json({
                    msg: `Membro de id${req.params.id} deletado com sucesso`,
                    resultMembers: members
                });
            }
            i++;
        });
    } else {
        res.status(400).json({
            msg: `nao foi encontrado nenhum cadastro com o id passado de ${req.params.id}`
        })
    }
});

module.exports = router;