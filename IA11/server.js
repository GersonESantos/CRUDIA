// 11
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Servir o HTML
app.use("/uploads", express.static("uploads")); // Servir imagens

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gabibi89*",
  database: "projeto"
});

db.connect(err => {
  if (err) throw err;
  console.log("Banco de dados conectado!");
});

//Configuração do upload de imagens
// const storage = multer.diskStorage({
//   destination: "./uploads",
//   filename: (req, file, cb) => {
//     const filename = Date.now() + path.extname(file.originalname);
//     cb(null, filename);
//   }
// });

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Mantém o nome original do arquivo
  }
});

const upload = multer({ storage });

// Criar cliente
app.post("/clientes", upload.single("imagem"), (req, res) => {
  const { nome, email, telefone, afinidade } = req.body;
  const imagem = req.file ? req.file.filename : null;

  const sql = "INSERT INTO cliente (nome, email, telefone, afinidade, imagem) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [nome, email, telefone, afinidade, imagem], (err, result) => {
    if (err) {
      console.error("Erro ao inserir no banco:", err);
      return res.status(500).send("Erro ao cadastrar cliente.");
    }
    res.send("Cliente cadastrado com sucesso!");
  });
});

// Listar clientes
app.get("/clientes", (req, res) => {
  db.query("SELECT * FROM cliente", (err, results) => {
    if (err) {
      console.error("Erro ao buscar clientes:", err);
      return res.status(500).send("Erro ao buscar clientes.");
    }
    res.json(results);
  });
});
// Deletar cliente
app.delete("/clientes/:id", (req, res) => {
  db.query("DELETE FROM cliente WHERE id=?", [req.params.id], (err, result) => {
    if (err) throw err;
    res.send("Cliente removido!");
  });
});
// Servir o HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar o servidor
app.listen(8080, () => {
  console.log("Servidor rodando em http://localhost:8080");
});
