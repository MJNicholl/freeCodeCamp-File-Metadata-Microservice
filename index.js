var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

const multer = require("multer");
const upload = multer({dest: "upfile"})

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// start

function CheckUploadedFile(req, res)
{
  let answer = {
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": Number(req.file.size)
  };
  res.send(answer)
}

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  CheckUploadedFile(req, res);
})

// end

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
