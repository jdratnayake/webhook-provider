"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
let subscribers = [];
// Register a webhook URL
router.post("/webhook/register", (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: "Webhook URL is required" });
    }
    const subscriber = {
        id: `${Date.now()}`,
        url,
    };
    subscribers.push(subscriber);
    res.status(201).json({ message: "Webhook registered", subscriber });
});
// Trigger an event
router.post("/webhook/trigger", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { event, payload } = req.body;
    if (!event || !payload) {
        return res.status(400).json({ error: "Event and payload are required" });
    }
    const webhookEvent = { event, payload };
    // Send webhook to all subscribers
    for (const subscriber of subscribers) {
        try {
            yield axios_1.default.post(subscriber.url, webhookEvent);
            console.log(`Webhook sent to ${subscriber.url}`);
        }
        catch (error) {
            console.error(`Failed to send webhook to ${subscriber.url}:`, error);
        }
    }
    res.status(200).json({ message: "Event triggered and webhooks sent" });
}));
exports.default = router;
