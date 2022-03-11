"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailQueue = exports.sendEmail = void 0;
const bull_1 = __importDefault(require("bull"));
const email_process_1 = require("../processes/email.process");
//redis queue connection
const emailQueue = new bull_1.default('email', {
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
});
exports.emailQueue = emailQueue;
//The queue process the email-function(process)
emailQueue.process(email_process_1.emailProcess);
const sendEmail = (data) => {
    //Manages the queue
    emailQueue.add(data, {
        attempts: 5
    });
};
exports.sendEmail = sendEmail;
