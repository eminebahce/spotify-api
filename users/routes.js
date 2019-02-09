const { Router } = require('express');
const User = require('./model');
const bcrypt = require('bcrypt');

const router = new Router();

router.post('/users', (req, res, next) => {
    const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        password_confirmation: bcrypt.hashSync(req.body.password_confirmation, 10)
    }

    User
        .create(user)
        .then(entity => {
            res.send({
                id: entity.id,
                email: entity.email
            })
        }).catch(error => {
            console.error(error);
            res.status(500).send({
                message: 'Something went wrong'
            })
    })
});


module.exports = router;