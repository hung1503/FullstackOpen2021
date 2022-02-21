import patientData from '../../data/patients';
import {v1 as uuid} from 'uuid';
import { Patient, NonSsnPatient, NewPatientEntry, Entry } from '../types';

const id = uuid();

const patients: Array<Patient> = patientData as Array<Patient>;

const getPatients = (): Array<Patient> => {
    return patients;
}

const getNonSsnPatients = (): NonSsnPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }))
}

const getOnePatient = (id: string): Patient | undefined => {
    return patients.find((patients)=> patients.id === id);
};


const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: id,
        ...entry

    }

    patients.push(newPatientEntry);
    return newPatientEntry;
}

const addEntry = (patientId: string, entry: Entry): Entry => {

    const patient: Patient | undefined = getOnePatient(patientId);
    if (!patient) {
      throw new Error(`Incorrect patient id`);
    }
  
    patient.entries.push(entry);
  
    return entry;
  };

export default { getPatients, getNonSsnPatients, addPatient, getOnePatient, addEntry }