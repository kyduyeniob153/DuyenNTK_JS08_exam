const express = require("express");
const app = express();

// get - lay ra
// post - tao moi
// put - cap nhat
// delete - xoa

app.get("/", (req, res) => {
    res.write("Hello Duyen");
    res.end();

})

app.listen(8081, () => {
  console.log("Server running port 8081");
});
