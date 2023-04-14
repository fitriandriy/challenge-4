const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

const router = require('./routes');
app.use(router);

app.listen(port, () => console.log(`Server running in port ${port}`));
