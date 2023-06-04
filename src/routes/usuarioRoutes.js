const router = require('express').Router();

const Usuario = require('../models/Usuario');


router.get('/', async (req, res) => {
    try {
        const usuario = await Usuario.find()

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post('/', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        res.status(422).json({ error: 'os campos necessários nao foram preecnhidos!' });
        return;
    }

    const usua = {
        email,
        senha
    };

    // confere se o usuario está esta cadastrado no banco
    try {
        const usuarioEncontrado = await Usuario.findOne({ email: req.body.email, senha: req.body.senha })

        if (!usuarioEncontrado) {
            res.status(401).json({ error: 'Usuaria não cadastrado' })
            return;
        }

        res.status(200).json({ message: 'usuario cadastrado!' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post('/novo', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        res.status(422).json({ error: 'os campso necessários nao foram preecnhidos!' });
        return;
    }

    const usua = {
        nome,
        email,
        senha
    };

    // insere o novo usuario no banco
    try {
        await Usuario.create(usua);
        res.status(201).json({ message: 'novo usuario cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});



module.exports = router;