const { Producto } = require("../models/models");

//Get de todos los Productos y poder filtrar por cualquier propiedad
exports.selectProductos = (req, res) => {
  const { nombre, precio_min, precio_max, estado, idCategoria } = req.query;

  // Crear un objeto con las propiedades de la consulta que no son nulas o vacías
  const consulta = {};
  if (nombre !== undefined && nombre !== "") consulta.nombre = nombre;
  if (estado !== undefined && estado !== "") consulta.estado = estado;
  if (idCategoria !== undefined && idCategoria !== "") consulta.idCategoria = idCategoria;

  if (precio_min !== undefined && precio_min !== "" && precio_max !== undefined && precio_max !== "") {
    consulta.precio = { $gte: Number(precio_min), $lte: Number(precio_max) };
  }

  Producto.find(consulta)
    .populate("idCategoria")
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ error: error.message }));
};

//Get un Producto
exports.selectProducto = (req, res) => {
  const { id } = req.params.id;
  Producto.findOne(id)
  .populate("idCategoria")
  .populate("idUsuarioVendedor")
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

//Get Productos de un Usuario
exports.selectProductosDeUsuario = (req, res) => {
  const id = req.params.id;
  Producto.find({ idUsuarioVendedor: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

//Get ProductosVendidos de un usuario
exports.selectProductosVendidosDeUsuario = (req, res) => {
  const id = req.params.id;
  Producto.find({ idUsuarioVendedor: id, estado: "Comprado" })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

//Get ProductosComprados de un usuario
exports.selectProductosCompradosDeUsuario = (req, res) => {
  const id = req.params.id;
  Producto.find({ idUsuarioComprador: id, estado: "Comprado" })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

//Post Producto
exports.insertProducto = (req, res) => {
  const producto = Producto(req.body);
  producto
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

//Put un Producto
exports.updateProducto = (req, res) => {
  const { id } = req.params.id;
  const {
    nombre,
    descripcion,
    precio,
    imagen,
    Categoria,
    estado,
    fechaCreacion,
    fechaCompra,
  } = req.body;
  Producto.findOneAndUpdate(
    { id },
    {
      $set: {
        nombre,
        descripcion,
        precio,
        imagen,
        Categoria,
        estado,
        fechaCreacion,
        fechaCompra,
      },
    }
  )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

//Delete un Producto
exports.deleteProducto = (req, res) => {
  const { id } = req.params.id;
  Producto.findOneAndRemove(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};
