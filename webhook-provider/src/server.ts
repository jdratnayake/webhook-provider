import express from "express";
import bodyParser from "body-parser";
import webhookRoutes from "./webhookRoutes";

const app = express();
app.use(bodyParser.json());

app.use("/api", webhookRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Webhook provider is running on http://localhost:${PORT}`);
});
