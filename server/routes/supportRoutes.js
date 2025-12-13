const express = require("express");
const router = express.Router();
const { createSupportMessage } = require("../controllers/supportController");

router.post("/", createSupportMessage);

module.exports = router;
