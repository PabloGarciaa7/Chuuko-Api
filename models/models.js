const mongoose = require("mongoose");

const Usuario = mongoose.model(
  "Usuario",
  new mongoose.Schema({
    nombre: String,
    apellidos: String,
    localidad: String,
    telefono: {
      type: Number,
      unique: true,
      required: true,
      validate: {
        validator: function (value) {
          const telefonoRegex = /^[0-9]{9}$/;
          return telefonoRegex.test(value);
        },
        message: 'El numero de teléfono no es válido',
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: 'El correo electrónico no es válido',
      },
    },
    password: String,
  })
);

const Producto = mongoose.model(
  "Producto",
  new mongoose.Schema({
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    imagen: String,
    idCategoria: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Categoria",
      required: true,
    },
    estado: {
      type: String,
      enum: ["Disponible", "Reservado", "Comprado"],
      default: "Disponible",
    },
    fechaCreacion: {
      type: String,
      required: true,
    },
    fechaCompra: String,
    idUsuarioVendedor: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Usuario",
      required: true,
    },
    idUsuarioComprador: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Usuario",
    },
  })
);

const Categoria = mongoose.model(
  "Categoria",
  new mongoose.Schema({
    nombreCategoria: {
      type: String,
      required: true,
      unique: true,
    },
  })
);

module.exports = {
  Usuario,
  Producto,
  Categoria,
};
