const { Router } = require("express");
const router = Router();
const  path  = require("path");
const { unlink } = require("fs-extra");

const Image = require("../models/Image");

router.get("/", async (req, res) => {
    const images = await Image.find();
     res.json(images);
    //res.render("index", {images});
});
 
router.get("/upload", (req,res) => {
    res.render("upload");
});

router.post("/upload", async (req,res) => {
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = "/img/uploads/" + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    await image.save();
    // console.log(image);
    // res.redirect("/");

    res.json({
        "status" : "Imagen uploaded"
      });

});

router.get("/image/:id", async (req,res) => {
    const image = await Image.findById(req.params.id);
    console.log(image);
    res.render("profile", { image });
})

router.get("/image/:id/delete", async  (req,res) => {
    const { id } = req.params; // recibes el id de la imagen que quieres eliminar
    const image = await Image.findByIdAndDelete(id); //vamos a nuestra bd y con el id eliminamos los datos de la imagen de mongo y guardamos los datos para usarlos en la sig lineas
    await unlink(path.resolve("./src/public" + image.path)); // con los datos y el modulo de fs-extra eliminamos la imagen de la carpeta
    res.redirect("/");
});

module.exports = router;