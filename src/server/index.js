import path from 'path';
import express from 'express';
import WebSocket from 'ws';
import cookieParser from 'cookie-parser';
import cookie from 'cookie';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
mongoose.connect(process.env.DB_KEY, { useUnifiedTopology: true, useNewUrlParser: true });

import { validateEmail, generateAuthToken, toLowerCaseString, getRandomColor } from './utils.js';
import { User, Whitelist } from './models.js';


//////////////////////////////////////
//  EXPRESS
//////////////////////////////////////


const app = express();

app.disable('x-powered-by');
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


//////////////////////////////////////
//  WEBSOCKET
//////////////////////////////////////


const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', ws => {
    ws.on('message', console.log);
});


//////////////////////////////////////
//  ROUTES
//////////////////////////////////////


const authTokens = {};

const addAuthenticatedUser = (res, user) => {
    const authToken = generateAuthToken();

    authTokens[authToken] = { username: user.username, color: user.color};
    res.cookie('AuthToken', authToken, { httpOnly: true/*, secure: true*/, sameSite: 'strict'});
}


app.use((req, res, next) => {
    const token = req.cookies['AuthToken'];
    req.user = authTokens[token];
    next();
});

app.post('/api/v1/login', async (req, res) => {

    // Check if request is valid
    const isValidRequest = req.body.username && req.body.password;
    if (!isValidRequest) return res.sendStatus(400);


    // Check if user exists
    const user = await User.findOne({ $or: [
        { username: String(req.body.username) },
        { email: toLowerCaseString(req.body.email) }
    ]});

    if (!user) return res.sendStatus(401);


    // Check if password is valid
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) return res.sendStatus(401);


    // Create authenticated session
    const { username, color } = user;

    addAuthenticatedUser(res, user);
    res.send({ username, color });
});


app.post('/api/v1/register', async (req, res) => {

    //Check if request is valid
    const isValidRequest = req.body.email && req.body.username && req.body.password;
    if (!isValidRequest || !validateEmail(req.body.email)) return res.sendStatus(400);


    // Check if email is whitelisted
    const email = toLowerCaseString(req.body.email);
    const whitelist = await Whitelist.findOne({ email: email });
    if (!whitelist) return res.sendStatus(403);


    // Check if user already exists
    const user = await User.findOne({ $or: [
        { username: String(req.body.username) },
        { email }
    ]});
    if (user) return res.sendStatus(409);


    // Create user entry in database
    const hash = bcrypt.hashSync(req.body.password, 12);
    const color = getRandomColor();

    new User({
        email,
        username: req.body.username,
        password: hash,
        color
    }).save();


    // Create authenticated session
    const userObj = { username: req.body.username, color };
    addAuthenticatedUser(res, userObj);
    res.send(userObj);
});


app.get('/api/v1/user', (req, res) => {
    if (req.user) res.send(req.user);
    else res.sendStatus(401);
});


app.get('*', (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
});


//////////////////////////////////////
//  WS
//////////////////////////////////////

wss.on('connection', (socket, req) => {
    socket.send('Hello!');
});


//////////////////////////////////////
//  MAIN
//////////////////////////////////////


const server = app.listen(8080, () => {
    console.log('Server started.');
});

server.on('upgrade', (req, socket, head) => {
    if (!req.headers.cookie) return res.sendStatus(401);

    const cookies = cookie.parse(req.headers.cookie);

    if (authTokens[cookies.AuthToken])
        wss.handleUpgrade(req, socket, head, socket => {
            wss.emit('connection', socket, req);
        });

    else socket.end();
});
