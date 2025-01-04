"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const webhookRoutes_1 = __importDefault(require("./webhookRoutes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use("/api", webhookRoutes_1.default);
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Webhook provider is running on http://localhost:${PORT}`);
});
