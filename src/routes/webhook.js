const express = require("express");

const router = express.Router();

router.get("/:adminId", (req, res) => {
  try {
    return res.send(req.query["challange"]);
  } catch (error) {
    return res.send(error.message);
  }
});

router.post("/:adminId", (req, res) => {
  const { adminId } = req.params;
  const payload = req.body || {};

  if (!adminId || typeof adminId !== "string") {
    return res.status(400).json({
      ok: false,
      message: "adminId path parameter is required",
    });
  }

  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return res.status(400).json({
      ok: false,
      message: "Request body must be a JSON object",
    });
  }

  const receivedAt = new Date().toISOString();

  console.log(
    JSON.stringify({
      type: "webhook_received",
      adminId,
      receivedAt,
      payload,
    })
  );

  return res.status(200).json({
    ok: true,
    message: "Webhook received",
    adminId,
    receivedAt,
    payload,
  });
});

module.exports = router; 
