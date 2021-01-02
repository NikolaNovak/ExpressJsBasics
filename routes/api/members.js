const express = require("express");
const router = express.Router();
const members = require("../../Members");

// Get all members
router.get("/", (req, res) => res.json(members));

// Get single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === +req.params.id);

  if (found) res.json(members.filter((member) => member.id === +req.params.id));
  else res.status(400).json({ msg: `Member with ID ${req.params.id} not found` });
});

module.exports = router;
