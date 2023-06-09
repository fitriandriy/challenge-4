const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');
const app = express();
const {
  HTTP_PORT = 8000
} = process.env;

const file = fs.readFileSync('./docs.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const router = require('./routes');
app.use(router);

// 404 
app.use((req, res, next) => {
  return res.status(404).json({
      message: "404 Not Found!"
  });
});

// 500
app.use((err, req, res, next) => {
  return res.status(500).json({
      message: err.message
  });
});

app.listen(HTTP_PORT, () => console.log(`Server running in port ${HTTP_PORT}`));
