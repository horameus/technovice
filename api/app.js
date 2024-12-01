import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { router } from './router/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(
    cors({
        origin: [
            'http://localhost:3005',
            'http://localhost:3000',
            'https://technovice-app-196e28ed15ce.herokuapp.com',
        ],
        credentials: true,
    }),
);

app.use(express.json());

app.use(cookieParser());

const port = process.env.NODE_ENV === 'test' ? 4000 : process.env.PORT || 3000;

// Route to test if the server is running
app.get('/api', (req, res) => {
    return res.json({ message: "Bienvenue sur Techno'vice API" });
});

app.use(router);

//Error handling middleware
app.use((err, req, res, next) => {
    if (err) {
        const { status, message } = err;
        return res.status(status).json({ message });
    }
    next();
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/dist')));

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
});

app.listen(port, error => {
    if (!error) {
        console.log('Server is Successfully Running, and App is listening on port ' + port);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});

export default app;
