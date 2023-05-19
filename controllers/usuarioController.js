const { Usuario } = require("../models/models.js");

// Get todos los usuarios
exports.selectUsuarios = (req, res) =>
  Usuario.find()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error }));

//Get un Usuario
exports.selectUsuario = (req, res) => {
  const { id } = req.params;

  if (id === undefined || id === "") {
    res.status(400).json({message: "No se encontró ningún usuario"});
    return;
  }

  Usuario.findOne({ _id: id })
    .then((data) => {
      if (!data) {
        res.status(400).json({message: "No se encontró ningún usuario"})
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
    res.status(400).json({ message: "No se encontró ningún email asociado" });
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
    .catch((error) => res.status(404).json({ error: error.message }));
};

//Post Usuario
exports.insertUsuario = (req, res) => {
  const usuario = Usuario(req.body);
  usuario
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error }));
};

//Put un Usuario
exports.updateUsuario = (req, res) => {
  const { id } = req.params;

  if (id === undefined || id === "") {
    res.status(404).json({ message: "No se ha encontrado usuario" });
    return;
  }

  const { nombre, apellidos, localidad, telefono, email, password } = req.body;
  Usuario.findOneAndUpdate(
    { _id: id },
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
  .then((data) => {
    if (!data) {
      res.status(404).json({ message: "No se encontró ningún usuario" });
    } else {
      res.json(data);
    }
  })
  .catch((error) => res.status(500).json({ error: error.message }));
};

//Delete un Usuario
exports.deleteUsuario = (req, res) => {
  const { id } = req.params;

  if (id === undefined || id === "") {
    res.status(400).json({ message: "No se ha encontrado usuario" });
    return;
  }

  Usuario.findOneAndRemove({ _id: id })
  .then((data) => {
    if (!data) {
      res.status(404).json({ message: "No se encontró ningún usuario" });
    } else {
      res.json(data);
    }
  })
  .catch((error) => res.status(500).json({ message: "No se ha podido eliminar" }));
};