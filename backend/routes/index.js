var express = require("express");
var router = express.Router();
var generate = require("../api/generate");

router.post("/", async function (req, res) {
  const answer = await generate(req, res);
  res.send(answer);
});

module.exports = router;
