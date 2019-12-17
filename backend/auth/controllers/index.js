'use strict'
// Cargamos los modelos para usarlos posteriormente
const User = require('../models');

// Conseguir datos de un usuario
 getUser = (req, res) =>{
    var _id = req.params.id;
    //buscar un documento por un  id
    User.findById(_id, (err, user) => {
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(!user) return res.status(404).send({message: 'EL usuario no existe'});
        followThisUser(req.user.sub, _id).then((value) => {
            user.password = undefined;
            return res.status(200).send({
                user,
                following: value.following,
                followed: value.followed
            });
        });
        
    });
}