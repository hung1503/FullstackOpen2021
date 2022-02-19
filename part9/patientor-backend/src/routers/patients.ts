import express from 'express';
import patientService from '../services/patientService';
import  toNewPatientEntry  from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
    res.send(patientService.getNonSsnPatients());
});

patientRouter.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);

        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (e: any) {
        res.status(400).json(e.message);
    }
});

export default patientRouter;