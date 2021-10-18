const router = require("express").Router();
const messageController = require("../controllers/message.controller");

router.post("/", messageController.postMessage);
router.get("/:conversationId", messageController.getMessage);

module.exports = router;
