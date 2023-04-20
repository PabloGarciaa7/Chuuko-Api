const cors = require("cors");
const express = require("express");

const usuarioController = require("../controllers/usuarioController.js");
const productoController = require("../controllers/productoController.js");
const categoriaController = require("../controllers/categoriaController.js");

const router = express.Router();

router.get("/usuarios", cors(), usuarioController.selectUsuarios);
router.get("/usuarios/:id", cors(), usuarioController.selectUsuario);
router.post("/usuarios", cors(), usuarioController.insertUsuario);
router.put("/usuarios/:id", cors(), usuarioController.updateUsuario);
router.delete("/usuarios/:id", cors(), usuarioController.deleteUsuario);

router.get("/productos", cors(), productoController.selectProductos);
router.get("/productos/:id", cors(), productoController.selectProducto);
router.post("/productos", cors(), productoController.insertProducto);
router.put("/productos/:id", cors(), productoController.updateProducto);
router.delete("/productos/:id", cors(), productoController.deleteProducto);

router.get("/categorias", cors(), categoriaController.selectCategorias);
router.get("/categorias/:id", cors(), categoriaController.selectCategoriaPorId);
router.post("/categorias", cors(), categoriaController.insertCategoria);
router.put("/categorias/:id", cors(), categoriaController.updateCategoria);
router.delete("/categorias/:id", cors(), categoriaController.deleteCategoria);

router.get("/usuarios/:id/productos", cors(), productoController.selectProductosDeUsuario);
router.get("/usuarios/:id/productosVendidos", cors(), productoController.selectProductosVendidosDeUsuario);

module.exports = router;
