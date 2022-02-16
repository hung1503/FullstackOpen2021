import express from 'express';
import { calculatorBmi } from './calculateBmi';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculatorBmi(height, weight);

    if(!height || !weight) {
        res.status(400).send({
            error: 'malformatted parameters'
        });
    }

    res.send({ weight, height, bmi });
});

app.post('/exercise', (req, res) => {
  const data = req.body;
  const daily_exercises = data.daily_exercises;
  const target: number = data.target;
  console.log(daily_exercises.length)
  if(daily_exercises.length < 7 || !target) {
      res.status(400).json({
          error: 'parameters missing'
      });
  } else if (!Array(daily_exercises) && isNaN(Number(target))) {
      res.status(401).json({
          error: 'malformatted parameters'
      })
  }
  const exercise = calculateExercises(daily_exercises, target);
  res.send({exercise});
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});