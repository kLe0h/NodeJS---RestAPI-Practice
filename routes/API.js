const express = require("express");
const Usuario = require("../models/usuario");

const router = express.Router();

//GET
router.get("/", async (req, res) => {
  const usuarios = await Usuario.findAll();

  res.json(usuarios);
});

//GET BY ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);

  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({
      msg: `No existe un usuario con id ${id}`,
    });
  }
});

//POST
router.post("/", async (req, res) => {
  const { body } = req;

  try {
    //de esta forma verificamos si el usuario o correo ya existe en la base de datos.
    const existeUsuario = await Usuario.findAll({
      where: {
        nombre: body.nombre,
        email: body.email,
      },
    });

    if (existeUsuario) {
      return res.status(404).json({
        msg: "Ya existe un usuario con ese correo/nombre",
      });
    }

    const usuario = new Usuario(body);
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.json({
      msg: "Un error se ha producido",
    });
  }
});

//PUT
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const usuario = await Usuario.findByPk(id);

    // const existeUsuario = await Usuario.findAll({
    //   where: {
    //     nombre: body.nombre,
    //     email: body.email,
    //   },
    // });

    //validaciones para la edición de datos
    // if (existeUsuario) {
    //   return res.status(404).json({
    //     msg: "Ya existe un usuario con ese correo/nombre",
    //   });
    // }

    if (!usuario) {
      return res.status(404).json({
        msg: `No existe un usuario para editar con el id ${id}`,
      });
    }
    await usuario.update(body);
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Ha ocurrido un erro al modificar este usuario",
    });
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  if(!usuario){
    return res.status(404).json({
      msg: `Usuario no encontrado con el id ${id}`
    })
  }
  await usuario.destroy();
  res.json(usuario)
});

module.exports = router;
