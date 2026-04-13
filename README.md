# Webhook Service (Phase 1)

Simple Node.js + Express webhook service to receive vendor events per admin.

## Endpoints

- `GET /health` - service health check.
- `POST /webhook/:adminId` - receives vendor webhook payload.

Example request body:

```json
{
  "vendorId": "vendor_abc",
  "eventType": "promotion_update",
  "data": {
    "campaignId": "cmp_001",
    "status": "active"
  }
}
```

Success response:

```json
{
  "ok": true,
  "message": "Webhook received",
  "adminId": "admin_001",
  "receivedAt": "2026-04-13T12:00:00.000Z"
}
```

## Local setup

1. Install dependencies:
   - `npm install`
2. Copy env file:
   - `copy .env.example .env`
3. Start server:
   - `npm run dev`
4. Health check:
   - `http://localhost:3000/health`

## Test webhook locally

Use curl:

```bash
curl -X POST http://localhost:3000/webhook/admin_001 \
  -H "Content-Type: application/json" \
  -d "{\"vendorId\":\"vendor_abc\",\"eventType\":\"promotion_update\",\"data\":{\"campaignId\":\"cmp_001\",\"status\":\"active\"}}"
```

## Free hosting (Render)

1. Push this project to GitHub.
2. Create a new **Web Service** on Render.
3. Use:
   - Build command: `npm install`
   - Start command: `npm start`
4. Set environment variables:
   - `PORT=3000` (optional; Render sets PORT automatically)
   - `ALLOWED_ORIGINS=*` (or set specific domains)
5. Deploy. Your webhook URL will be:
   - `https://<your-render-service>.onrender.com/webhook/:adminId`

Vendor example:
- `https://<your-render-service>.onrender.com/webhook/admin_001`
