import path from 'path';
import express from 'express';


//////////////////////////////////////
//  EXPRESS
//////////////////////////////////////


const app = express();

app.disable('x-powered-by');
app.use(express.static('public'));
app.use(express.json());


//////////////////////////////////////
//  ROUTES
//////////////////////////////////////


app.get('/api/v1/login', (req, res) => {
    if (!req.body.username || !req.body.password) return res.sendStatus(400);
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
});


//////////////////////////////////////
//  MAIN
//////////////////////////////////////


app.listen(8080, () => {
    console.log('Server started.');
});
