import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routers/diagnoses';
import patientRouter from './routers/patients';
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});