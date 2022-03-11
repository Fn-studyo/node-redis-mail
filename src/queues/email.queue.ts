import Bull from "bull";
import { emailProcess } from "../processes/email.process";

//redis queue connection
const emailQueue = new Bull('email', {
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
});

//The queue process the email-function(process)
emailQueue.process(emailProcess);

const sendEmail = (data: any) => {

    //Manages the queue
    emailQueue.add(data, {
        attempts: 5
    });
}

export {
    sendEmail,
    emailQueue
}