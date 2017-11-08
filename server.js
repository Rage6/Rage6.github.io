const express = require('express');
const app     = express();
const port    = process.env.PORT || 4000;

app.use(express.static('views'))

app.listen(port, ()=>{
  console.log("Port " + port + "functioning.")
})
