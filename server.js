import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import axios from 'axios';
import cors from 'cors';

const LEAN_APP_TOKEN = 'f4a1ca0a-043e-4263-88ac-425e078acfdf';

const LEAN_BASE_URL = 'https://sandbox.leantech.me';
const LEAN_IDENTITY_URL = `${LEAN_BASE_URL}/data/v1/identity`;
const LEAN_CUSTOMERS_URL = `${LEAN_BASE_URL}/customers/v1/`;

const app = express();
const httpServer = createServer(app);
const PORT = 3000;

const leanAPIInstance = axios.create({
    headers: {
        'lean-app-token': LEAN_APP_TOKEN,
    },
    baseURL: LEAN_BASE_URL,
});

const io = new Server(httpServer, { cors: 'https://localhost:5173' });

app.use(bodyParser.json(), cors());

const socketDataMap = {};

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        if (socket.id in socketDataMap) {
            delete socketDataMap[socket.id];
        }
    });
});

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.get('/get-customer-id', async (req, res) => {
    let customer_id;

    await leanAPIInstance
        .post(LEAN_CUSTOMERS_URL, {
            app_user_id: `user-${crypto.randomUUID()}`,
        })
        .then(({ data }) => {
            customer_id = data.customer_id;
        });

    socketDataMap[req.query.socketId] = customer_id;

    res.send({ customer_id });
});

app.post('/lean-entity-webhook', async (req, res) => {
    const body = req.body;

    if (body) {
        console.log('Webhook received:', body);
        const { id: entity_id, customer_id, bank_details } = body.payload;

        let payload = {};

        await leanAPIInstance
            .post(LEAN_IDENTITY_URL, {
                entity_id,
            })
            .then(({ data }) => {
                const email_address = data?.payload?.email_address || '';
                const full_name = data?.payload?.full_name || '';

                payload = {
                    bank_details,
                    email_address,
                    full_name,
                    entity_id,
                };

                io.to(getKeyByValue(socketDataMap, customer_id)).emit('userinfo', payload);
            });

        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

httpServer.listen(PORT, () => {
    console.log('Server listening on port:', PORT);
});

function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}
