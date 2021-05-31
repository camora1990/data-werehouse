const { Router, response, request } = require("express");

const router = Router();

router.get("/", (req = request, res = response) => {
  res.json({ msg: "prueba" });
});

module.exports = router;
