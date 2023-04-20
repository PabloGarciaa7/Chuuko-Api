const { Categoria } = require("../models/models");

//Get Todas las categoría
exports.selectCategorias = (req, res) =>
  Categoria.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));

//Get de una categoría
exports.selectCategoriaPorId = (req, res) => {
  const { id } = req.params.id;
  Categoria.findOne(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
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
  const categoria = new Categoria(req.body);
  categoria
    .findOneAndUpdate(
      { id },
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
