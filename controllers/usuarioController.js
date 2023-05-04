const { Usuario } = require("../models/models.js");

// Get todos los usuarios
exports.selectUsuarios = (req, res) =>
  Usuario.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));

//Get un Usuario
exports.selectUsuario = (req, res) => {
  const { id } = req.params.id;

  if (id === undefined || id === "") {
    res.status(400).json({message: "No se encontró ningun usuario"});
    return;
  }
  Usuario.findOne(id)
    .then((data) => {
      if (!data) {
        res.status(400).json({message: "No se encontró ningun usuario"})
      }else{
        res.json(data);
      }
    })
    .catch((error) => res.status(500).json({ message: error }));
};

//Get un Usuario por Email
exports.selectUsuarioPorEmail = (req, res) => {
  const { email } = req.query;

  if (email === undefined || email === "") {
    // Si no se proporciona un email, enviamos una respuesta con un estado 400 y un mensaje de error
    res.status(400).json({ message: "Debes proporcionar un email para buscar un usuario" });
    return;
  }

  const consulta = { email: email.toLowerCase() };

  Usuario.findOne(consulta)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No se encontró ningún usuario con el email proporcionado" });
      } else {
        res.json(data);
      }
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

//Post Usuario
exports.insertUsuario = (req, res) => {
  const usuario = Usuario(req.body);
  usuario
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

//Put un Usuario
exports.updateUsuario = (req, res) => {
  const { id } = req.params.id;
  const { nombre, apellidos, localidad, telefono, email, password } = req.body;
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
  Usuario.findOneAndRemove(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};
