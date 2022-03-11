import express from 'express';
import bodyParser from 'body-parser';
import { emailQueue, sendEmail } from './queues/email.queue';
import { ExpressAdapter } from '@bull-board/express';
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { createBullBoard } from '@bull-board/api';

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

const serverAdapter = new ExpressAdapter();

const {  } = createBullBoard({
    queues: [
        new BullAdapter(emailQueue),
    ],
    serverAdapter: serverAdapter
});

serverAdapter.setBasePath('/admin/queues');

app.use('/admin/queues', serverAdapter.getRouter());

app.post('/send-mail', async (req, res) => {
    await sendEmail(req.body);
    return res.send({
        status: 'ok'
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`App is running on port ${PORT}`))