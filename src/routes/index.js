const router = require('express').Router();
const { isAuthenticated } = require('../helpers/auth');
const User = require('../models/User');


router.get('/', (req, res) => {
    res.render('index');
});
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard');
});

router.post('/perfil-up/:id', async(req, res) => {
    let id = req.params.id;
    const { nombre, apellido, email, username } = req.body;
    await User.findByIdAndUpdate(req.params.id, { nombre, apellido, email, username })
    req.flash('success_msg', 'Perfil actualizado');
    res.redirect('/profile');
    // const { id } = req.params;
    // User.findByIdAndUpdate(id, { nombre, apellido, email, usuario });
    // res.redirect('/dashboard');
    // const user = await User.findById(req.params.id, (err, user) => {
    //     res.render('perfil-up', {
    //         user
    //     });

    // });
});

router.put('/perfil-up/:id', (req, res) => {
    const { id } = req.params;
    User.findByIdAndUpdate(req.params.id, { nombre, apellido, email, usuario });
    res.redirect('/dashboard');
    // const user = await User.findById(req.params.id, (err, user) => {
    //     res.render('perfil-up', {
    //         user
    //     });

    // res.send(req.params);

});
router.get('/profile', isAuthenticated, (req, res) => {
    console.log(req.user);
    const usuario = User.find();
    res.render('profile', { user: req.user, usuario });
});
module.exports = router;