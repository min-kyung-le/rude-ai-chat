var express = require("express");
var router = express.Router();
var generate = require("../api/generate");

router.post("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

router.post("/api/generate", async function (req, res) {
  const answer = await generate(req, res);
  res.send(answer);
});

module.exports = router;
