import express, { NextFunction } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import { authenticate, logResponseBody } from './middleware/auth.middleware';

const app = express();

// Middleware
app.use(cors());


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log CORS headers
app.use((req, res, next) => {
  res.on('finish', () => {
    // console.log('CORS headers:', {
    //   'Access-Control-Allow-Origin': res.getHeader('Access-Control-Allow-Origin'),
    //   'Access-Control-Allow-Methods': res.getHeader('Access-Control-Allow-Methods'),
    //   'Access-Control-Allow-Headers': res.getHeader('Access-Control-Allow-Headers')
    // });
  });
  next();
});
app.use(logResponseBody);
// Routes
app.use('/api/auth', authRoutes);

// Protected route example
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});
export default app;