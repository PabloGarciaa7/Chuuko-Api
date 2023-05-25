const { Producto } = require("../models/models");

//Get de todos los Productos y poder filtrar por cualquier propiedad
exports.selectProductos = (req, res) => {
  const { nombre, precio_min, precio_max, estado, idCategoria } = req.query;

  const consulta = {};
  if (nombre !== undefined && nombre !== "") {
    const regex = new RegExp(nombre, "i");
    consulta.nombre = regex;
  }
  if (estado !== undefined && estado !== "") consulta.estado = estado;
  if (idCategoria !== undefined && idCategoria !== "")
    consulta.idCategoria = idCategoria;

  if (
    (precio_min !== undefined && precio_min !== "") ||
    (precio_max !== undefined && precio_max !== "")
  ) {
    const filtroPrecio = {};
    if (precio_min !== undefined && precio_min !== "")
      filtroPrecio["$gte"] = Number(precio_min);
    if (precio_max !== undefined && precio_max !== "")
      filtroPrecio["$lte"] = Number(precio_max);

    consulta.precio = filtroPrecio;
  }

  Producto.find(consulta)
    .populate("idCategoria")
    .then((data) => {
      if (!data) {
        res.status(400).json({message: "No se encontró ningun producto"})
      }else{
        res.json(data);
      }
    })
    .catch((error) => res.status(500).json({ message: "No se encontró ningun producto" }));
};

//Get un Producto
exports.selectProducto = (req, res) => {
  const { id } = req.params;

  if (id === undefined || id === "") {
    res.status(400).json({ message: "No se encontró ningun producto" });
    return;
  }
  
  Producto.findOne({_id : id})
    .populate("idCategoria")
    .populate("idUsuarioVendedor")
    .populate("idUsuarioComprador")
    .then((data) => {
      console.log(data);
      if (!data) {
        res.status(400).json({ message: "No se encontró ningun producto" });
      } else {
        res.json(data);
      }
    })
    .catch((error) => res.status(500).json({ message: "No se encontró ningun producto" }));
};

//Get Productos de un Usuario por el Estado
exports.selectProductosDeUsuarioPorEstado = (req, res) => {
  const idUsuarioVendedor = req.params.idUsuarioVendedor;
  const estado = req.query.estado;

  const consulta = {
    idUsuarioVendedor: idUsuarioVendedor
  };

  console.log(idUsuarioVendedor)

  if (estado) {
    consulta.estado = estado;
  }

  console.log(estado)
  
  Producto.find(consulta)
    .then((data) => {
      if (data.length > 0) {
        res.json(data);
      } else {
        res.status(404).json({ message: "No se encontraron productos" });
      }
    })
    .catch((error) => res.status(500).json({ message: "Error al buscar productos", error: error }));
};

//Post Producto
exports.insertProducto = (req, res) => {
  const producto = Producto(req.body);
  producto
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error }));
};

//Put un Producto
exports.updateProducto = (req, res) => {
  const { id } = req.params;

  if (id === undefined || id === "") {
    res.status(400).json({ message: "No se encontró ningún producto" });
    return;
  }

  const {
    nombre,
    descripcion,
    precio,
    imagen,
    idCategoria,
    estado,
    fechaCreacion,
    fechaCompra,
    idUsuarioVendedor,
    idUsuarioComprador
  } = req.body;
  Producto.findOneAndUpdate(
    { _id:id },
    {
      $set: {
        nombre,
        descripcion,
        precio,
        imagen,
        idCategoria,
        estado,
        fechaCreacion,
        fechaCompra,
        idUsuarioVendedor,
        idUsuarioComprador
      },
    }
  )
    .then((data) => {
      console.log(data);
      if (!data) {
        res.status(400).json({ message: "No se encontró ningun producto" });
      } else {
        res.json(data);
      }
    })
    .catch((error) => res.status(500).json({ message: error }));
};

//Delete un Producto
exports.deleteProducto = (req, res) => {
  const { id } = req.params;

  if (id === undefined || id === "") {
    res.status(400).json({ message: "No se encontró ningun producto" });
    return;
  }

  Producto.findOneAndRemove({ _id: id })
    .then((data) => {
      console.log(data);
      if (!data) {
        res.status(400).json({ message: "No se encontró ningun producto" });
      } else {
        res.json(data);
      }
    })
    .catch((error) => res.status(500).json({ message: error }));
};
