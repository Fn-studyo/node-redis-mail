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
const body_parser_1 = __importDefault(require("body-parser"));
const email_queue_1 = require("./queues/email.queue");
const express_2 = require("@bull-board/express");
const bullAdapter_1 = require("@bull-board/api/bullAdapter");
const api_1 = require("@bull-board/api");
require('dotenv').config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const serverAdapter = new express_2.ExpressAdapter();
const {} = (0, api_1.createBullBoard)({
    queues: [
        new bullAdapter_1.BullAdapter(email_queue_1.emailQueue),
    ],
    serverAdapter: serverAdapter
});
serverAdapter.setBasePath('/admin/queues');
app.use('/admin/queues', serverAdapter.getRouter());
app.post('/send-mail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, email_queue_1.sendEmail)(req.body);
    return res.send({
        status: 'ok'
    });
}));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
