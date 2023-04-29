import cookieParser from 'cookie-parser';
import { router } from './server/index';
// const WebSocket = require('ws');
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const http = require('http')

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));
const server = http.createServer(app);


mongoose.connect('mongodb://localhost:27017/sample', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
const PORT = 3002
db.on('error', console.error.bind(console, 'connection error:'));

//initialize the WebSocket server instance
//const wss = new WebSocket.Server({ server });

server.listen(PORT, () => {
    console.log(`Sample server app listening on port ${PORT}!`);
});

