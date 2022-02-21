import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry }  from '../utils';
import { Entry } from '../types';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

patientRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService.getOnePatient(id);
    if (!patient){
        res.status(401).send(`Patient with id ${id} not found`);
    } else {
        res.send(patient);
    }
})

patientRouter.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);

        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (e: any) {
        res.status(400).json(e.message);
    }
});

patientRouter.post('/:id/entries', (req, res) => {
    const  id  = req.params.id;
    try {
      const newEntry: Entry = toNewEntry(req.body);
  
      const addedEntry = patientService.addEntry(id, newEntry);
      res.json(addedEntry);
    } catch (error: any) {
      res.status(400).send(error.message);
    }   
});

export default patientRouter;