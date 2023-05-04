const { Producto } = require("../models/models");

//Get de todos los Productos y poder filtrar por cualquier propiedad
exports.selectProductos = (req, res) => {
  const { nombre, precio_min, precio_max, estado, idCategoria } = req.query;

  // Crear un objeto con las propiedades de la consulta que no son nulas o vacías
  const consulta = {};
  if (nombre !== undefined && nombre !== "") consulta.nombre = nombre;
  if (estado !== undefined && estado !== "") consulta.estado = estado;
  if (idCategoria !== undefined && idCategoria !== "") consulta.idCategoria = idCategoria;

  if ((precio_min !== undefined && precio_min !== "") || (precio_max !== undefined && precio_max !== "")) {
    
    const filtroPrecio = {};
    if (precio_min !== undefined && precio_min !== "") filtroPrecio["$gte"] = Number(precio_min);
    if (precio_max !== undefined && precio_max !== "") filtroPrecio["$lte"] = Number(precio_max);
    
    consulta.precio = filtroPrecio;
  }

  Producto.find(consulta)
    .populate("idCategoria")
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ error: error.message }));
};

//Get un Producto
exports.selectProducto = (req, res) => {
  const { id } = req.params.id;

  if (id === undefined || id === "") {
    res.status(400).json({message: "No se encontró ningun producto"});
    return;
  }

  Producto.findOne(id)
  .populate("idCategoria")
  .populate("idUsuarioVendedor")
  .then((data) => {
      if (!data) {
        res.status(400).json({message: "No se encontró ningun producto"})
      }else{
        res.json(data);
      }
    })
    .catch((error) => res.status(500).json({ message: error }));
};

//Get Productos de un Usuario
exports.selectProductosDeUsuarioPorEstado = (req, res) => {
  const consulta = {};
  
  consulta.idUsuarioVendedor = req.params.id;

  const {estado } = req.query;
  
  if (estado !== undefined && estado !== "") consulta.estado = estado;

  Producto.find(consulta)
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
