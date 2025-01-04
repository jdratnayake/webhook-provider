import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.post("/webhook", (req: Request, res: Response) => {
  const { event, payload } = req.body;
  console.log(`Received event: ${event}`);
  console.log("Payload:", payload);
  res.status(200).send("Webhook received successfully");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Webhook consumer is running on http://localhost:${PORT}`);
});
