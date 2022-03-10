import Bull from "bull";
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { emailProcess } from "../processes/email.process";
import { ExpressAdapter } from "@bull-board/express";

const serverAdapter = new ExpressAdapter();

const emailQueue = new Bull('email', {
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
});

emailQueue.process(emailProcess);

const sendEmail = (data: any) => {
    emailQueue.add(data, {
        attempts: 5
    });
}

export {
    sendEmail,
    emailQueue
}