const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const multer = require("multer");
// const path = require("path");

const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static("uploads"));

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Gabibi89*",
//   database: "projeto"
// });

// db.connect(err => {
//   if (err) throw err;
//   console.log("Banco de dados conectado!");
// });

// // Configuração do upload de imagens
// const storage = multer.diskStorage({
//   destination: "./uploads",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage });

// // Criar cliente
// app.post("/clientes", upload.single("imagem"), (req, res) => {
//   const { nome, email, telefone, afinidade } = req.body;
//   const imagem = req.file ? req.file.filename : null;

//   const sql = "INSERT INTO cliente (nome, email, telefone, afinidade, imagem) VALUES (?, ?, ?, ?, ?)";
//   db.query(sql, [nome, email, telefone, afinidade, imagem], (err, result) => {
//     if (err) throw err;
//     res.send("Cliente cadastrado!");
//   });
// });

// // Listar clientes
// app.get("/clientes", (req, res) => {
//   db.query("SELECT * FROM cliente", (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

// // Atualizar cliente
// app.put("/clientes/:id", upload.single("imagem"), (req, res) => {
//   const { nome, email, telefone, afinidade } = req.body;
//   const imagem = req.file ? req.file.filename : null;
//   const id = req.params.id;

//   const sql = imagem
//     ? "UPDATE cliente SET nome=?, email=?, telefone=?, afinidade=?, imagem=? WHERE id=?"
//     : "UPDATE cliente SET nome=?, email=?, telefone=?, afinidade=? WHERE id=?";

//   const params = imagem ? [nome, email, telefone, afinidade, imagem, id] : [nome, email, telefone, afinidade, id];

//   db.query(sql, params, (err, result) => {
//     if (err) throw err;
//     res.send("Cliente atualizado!");
//   });
// });

// // Deletar cliente
// app.delete("/clientes/:id", (req, res) => {
//   db.query("DELETE FROM cliente WHERE id=?", [req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send("Cliente removido!");
//   });
// });

app.get('/', (req, res) => {
  res.write('Hello World! server.js');
  res.end()
});

// Servidor

app.listen(8080, () => {
  console.log('Rodando app listening at http://localhost:8080');
});
