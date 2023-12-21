const{Router }= require ('express')
const { usersModel } = require('../../models/users.model')

const router = Router ()

router.get('/', async (req, res) => {
    const users = await usersModel.find({});
    res.send(users);
});

router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;
        const result = await usersModel.create({
            first_name,
            last_name,
            email
        });
        console.log(first_name, last_name, email);
        res.status(201).send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Manejar errores de validación de Mongoose
            const validationErrors = {};
            for (const key in error.errors) {
                validationErrors[key] = error.errors[key].message;
            }
            res.status(400).send({
                status: 'error',
                message: 'Error de validación',
                errors: validationErrors
            });
        } else {
            // Manejar otros errores
            console.log(error);
            res.status(500).send({
                status: 'error',
                message: 'Error interno del servidor'
            });
        }
    }
});



router.put('/:uid', async (req, res) => {
    try {
        router.put('/:uid', async (req, res) => {
            const { uid } = req.params;
            const { first_name, last_name, email } = req.body;
            const result = await usersModel.updateOne({ _id: uid }, { first_name, last_name, email });
            res.status(201).send({
                status: 'success',
                payload: result
            });
        });
        

        // Actualizar el usuario por su ID
        const result = await usersModel.updateOne({ _id: uid }, {
            first_name,
            last_name,
            email
        });

        // Manejar el caso en que el usuario no existe
        if (result.nModified === 0) {
            return res.status(404).send({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }

        res.status(201).send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        // ... (manejar errores como lo has hecho en tu código original)
    }
});

router.delete ('/:uid', (req,res) =>{

})
module.exports = router