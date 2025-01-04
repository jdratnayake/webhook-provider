"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/webhook", (req, res) => {
    const { event, payload } = req.body;
    console.log(`Received event: ${event}`);
    console.log("Payload:", payload);
    res.status(200).send("Webhook received successfully");
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Webhook consumer is running on http://localhost:${PORT}`);
});
