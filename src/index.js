const express = require("Express");
const path = require("path");
const morgan = require("morgan");
const multer = require("multer");
const uuid = require("uuid/v4")
const { format } = require("timeago.js");

//INICIALIZACIONES
const app = express();

require("./database"); // ejecuta database.js que hace la coneccion a mongoose

//CONFIGURACIONES
app.set("port" , process.env.PORT || 3000);
app.set("views" , path.join(__dirname, "views"));
app.set("view engine", "ejs");


//MIDDLEWARES
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname,"public/img/uploads"),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});
app.use(multer({storage}).single("image"));

// VARIABLES GOBALES
app.use((req, res, next) => { //creas middleware para el timeago
    app.locals.format = format;
    next(); // para que continue con el resto de codigo
});

//ROUTERS
app.use(require("./routers/index.js"));

// STATICS FILES
app.use(express.static(path.join(__dirname, "public"))); // para decir que la carpeta public puede ser accedida desde el navegador

//START SERVER
app.listen(app.get("port"), () => {
    console.log(`Server on port: ${app.get("port")}`);
})