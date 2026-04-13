const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const webhookRouter = require("./routes/webhook");

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const allowedOrigins = process.env.ALLOWED_ORIGINS || "*";

app.use(
  cors({
    origin: allowedOrigins === "*" ? true : allowedOrigins.split(","),
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("combined"));

app.get("/health", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "Service healthy",
    uptimeSeconds: Math.round(process.uptime()),
  });
});

app.use("/webhook", webhookRouter);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      ok: false,
      message: "Invalid JSON payload",
    });
  }

  return res.status(500).json({
    ok: false,
    message: "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`Webhook service running on port ${port}`);
});
