const express = require("express");
const uuid = require("uuid");
const router = express.Router();
let members = require("../../Members");

// Get all members
router.get("/", (req, res) => res.json(members));

// Get single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === +req.params.id);

  if (found) {
    res.json(members.filter((member) => member.id === +req.params.id));
  } else {
    res.status(400).json({ msg: `Member with ID ${req.params.id} not found` });
  }
});

// Create new member
router.post("/", (req, res) => {
  const newMember = { id: uuid.v4(), name: req.body.name, email: req.body.email, status: "active" };
  if (!newMember.name || !newMember.email) {
    res.status(400).json({ msg: "Error! Please include a name and email." });
  } else {
    members.push(newMember);
    res.json(members);
  }
});

// Update member
router.put("/:id", (req, res) => {
  const index = members.findIndex((member) => member.id === +req.params.id);

  if (index !== -1) {
    const member = members[index];
    const updatedMember = req.body;

    member.name = updatedMember.name ? updatedMember.name : member.name;
    member.email = updatedMember.email ? updatedMember.email : member.email;

    res.json({ msg: `Member with ID ${req.params.id} updated`, member });
  } else {
    res.status(400).json({ msg: `Member with ID ${req.params.id} not found` });
  }
});

// Delete member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === +req.params.id);

  if (found) {
    const updatedMembers = members.filter((member) => member.id !== +req.params.id);
    members = updatedMembers;

    res.json({
      msg: `Member with ID ${req.params.id} deleted`,
      members,
    });
  } else {
    res.status(400).json({ msg: `Member with ID ${req.params.id} not found` });
  }
});

module.exports = router;
