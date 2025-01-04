import express, { Request, Response } from "express";
import axios from "axios";
import { WebhookSubscriber, WebhookEvent } from "./types";

const router = express.Router();

let subscribers: WebhookSubscriber[] = [];

// Register a webhook URL
router.post("/webhook/register", (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Webhook URL is required" });
  }

  const subscriber: WebhookSubscriber = {
    id: `${Date.now()}`,
    url,
  };

  subscribers.push(subscriber);
  res.status(201).json({ message: "Webhook registered", subscriber });
});

// Trigger an event
router.post("/webhook/trigger", async (req: Request, res: Response) => {
  const { event, payload } = req.body;
  console.log(`Payload: ${JSON.stringify(payload)}`);

  if (!event || !payload) {
    return res.status(400).json({ error: "Event and payload are required" });
  }

  const webhookEvent: WebhookEvent = { event, payload };

  // Send webhook to all subscribers
  for (const subscriber of subscribers) {
    try {
      await axios.post(subscriber.url, webhookEvent);
      console.log(`Webhook sent to ${subscriber.url}`);
    } catch (error) {
      console.error(`Failed to send webhook to ${subscriber.url}:`, error);
    }
  }

  res.status(200).json({ message: "Event triggered and webhooks sent" });
});

export default router;
