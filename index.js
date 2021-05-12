import express from 'express';
import cors from 'cors';

const app = express();

// Init Middleware
// Это то же, что body-parser:
app.use(express.json({ extended: false }));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Shutruk-Nahhunte!!!')
});

app.listen(5000, _ => console.log('Server started at 5000'));