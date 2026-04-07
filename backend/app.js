import express from 'express';
const app = express();
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser';

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRoutes);
app.get('/' , (req, res) => {
    res.send('Hello World!');
})

export default app