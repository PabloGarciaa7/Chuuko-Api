const { Categoria } = require("../models/models");

//Get Todas las categoría
exports.selectCategorias = (req, res) =>
  Categoria.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));

//Get de una categoría
exports.selectCategoriaPorId = (req, res) => {
  const { id } = req.params;

  if (id === undefined || id === "") {
    res.status(400).json({message: "No se encontró ningun categoría"});
    return;
  }

  Categoria.findOne(id)
  .then((data) => {
    if (!data) {
      res.status(400).json({message: "No se encontró ninguna categoría"})
    }else{
      res.json(data);
    }
  })
  .catch((error) => res.status(500).json({ message: error }));
};

//Post de una categoría
exports.insertCategoria = (req, res) => {
  const categoria = Categoria(req.body);
  categoria
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

//Put de una categoría
exports.updateCategoria = (req, res) => {
  const { id } = req.params;
  
  if (id === undefined || id === "") {
    res.status(400).json({ message: "No se encontró ninguna Categoría" });
    return;
  }

  const {nombreCategoria} = req.body;

  Categoria.findOneAndUpdate(
      { _id:id  },
      {
        $set: {
          nombreCategoria,
        },
      }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

//Delete de una Categoria
exports.deleteCategoria = (req, res) => {
  const { id } = req.params.id;
  Categoria.findOneAndRemove(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};