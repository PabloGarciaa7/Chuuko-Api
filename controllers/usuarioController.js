const { Usuario } = require("../models/models.js");

// Get todos los usuarios
exports.selectUsuarios = (req, res) =>
  Usuario.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));

//Get un Usuario
exports.selectUsuario = (req, res) => {
  const { id } = req.params.id;
  Usuario.findOne(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

exports.selectUsuarioPorEmail = (req, res) => {
  const { email } = req.query;

  const consulta = {};

  if (email !== undefined && email !== "") consulta.email = email;

  Usuario.findOne(consulta)
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ error: error.message }));
};

//Post Usuario
exports.insertUsuario = (req, res) =>{
  const usuario = Usuario(req.body);
  usuario
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

//Put un Usuario
exports.updateUsuario = (req, res) => {
  const { id } = req.params.id;
  const { nombre, apellidos, localidad, telefono, email, password } =
    req.body;
  Usuario.findOneAndUpdate(
    { id },
    {
      $set: {
        nombre,
        apellidos,
        localidad,
        telefono,
        email,
        password,
      },
    }
  )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

//Delete un Usuario
exports.deleteUsuario = (req, res) => {
  const { id } = req.params.id;
  Usuario.findOneAndRemove( id )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};
