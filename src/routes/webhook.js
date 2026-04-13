const express = require("express");

const router = express.Router();

router.post("/:adminId", (req, res) => {
  const { adminId } = req.params;
  const { vendorId, eventType, data } = req.body || {};

  if (!adminId || typeof adminId !== "string") {
    return res.status(400).json({
      ok: false,
      message: "adminId path parameter is required",
    });
  }

  if (!vendorId || typeof vendorId !== "string") {
    return res.status(400).json({
      ok: false,
      message: "vendorId is required and must be a string",
    });
  }

  if (!eventType || typeof eventType !== "string") {
    return res.status(400).json({
      ok: false,
      message: "eventType is required and must be a string",
    });
  }

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return res.status(400).json({
      ok: false,
      message: "data is required and must be an object",
    });
  }

  const receivedAt = new Date().toISOString();

  console.log(
    JSON.stringify({
      type: "webhook_received",
      adminId,
      vendorId,
      eventType,
      receivedAt,
      data,
    })
  );

  return res.status(200).json({
    ok: true,
    message: "Webhook received",
    adminId,
    receivedAt,
  });
});

module.exports = router;
