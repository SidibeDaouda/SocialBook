const router = require("express").Router();
const conversationController = require("../controllers/conversation.controller");

//new conv
router.post("/", conversationController.newConversation);

//get conv of a user
router.get("/:id", conversationController.getUserConv);

// get conv includes two userId
router.get(
  "/find/:firstUserId/:secondUserId",
  conversationController.getUsersConv
);

module.exports = router;
