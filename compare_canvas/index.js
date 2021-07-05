const EXPRESS_PORT = 8080;
const express = require("express");
const app = express();

app.use(express.static('public'));

app.listen(EXPRESS_PORT, () => {
    console.log("Express listening on " + EXPRESS_PORT);
});
