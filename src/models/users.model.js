const { Schema, model } = require('mongoose');

const userCollection = 'Usuarios';  // Reemplaza con el nombre correcto de la colección

const UserSchema = Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const userModel = model(userCollection, UserSchema);

module.exports = {
    usersModel: userModel
};
