const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');



// Login de usuario
router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});
router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/signin',
    failureFlash: true
}));
// registro de usuario
router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});
router.post('/users/signup', async(req, res) => {
    const { nombre, apellido, username, email, password, confirm_password } = req.body;
    const errors = [];
    if (username.length == 0) {
        errors.push({ text: 'Por favor ingresa tu nombre' });
    }
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña debe tener al menos 4 caracteres' });
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors: errors,
            nombre,
            apellido,
            username,
            email,
            password,
            confirm_password
        });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'El correo ya está registrado');
            res.redirect('/users/signup');
        }
        console.log(req.body);
        const newUser = new User({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            usuario: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Registro exitoso');
        res.redirect('/users/signin');
    }
    console.log(req.body);
});
// Logout de usuario
router.get('/users/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Sesión cerrada');
    res.redirect('/users/signin');
});

module.exports = router;