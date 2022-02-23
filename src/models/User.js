const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
// Registro de usuarios con moongose
const UserSchema = new Schema({
    nombre: { type: String },
    apellido: { type: String },
    usuario: { type: String },
    email: { type: String },
    password: { type: String },
    date: { type: Date, default: Date.now }
});

// Encriptar password
UserSchema.methods.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

// Comparar contraseñas
UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('User', UserSchema);