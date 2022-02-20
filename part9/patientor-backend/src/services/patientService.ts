import patientData from '../../data/patients';
import {v1 as uuid} from 'uuid';
import { Patient, NonSsnPatient, NewPatientEntry } from '../types';

const id = uuid();

const patients: Array<Patient> = patientData as Array<Patient>;

const getPatients = (): Array<Patient> => {
    return patients;
}

const getNonSsnPatients = (): NonSsnPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: id,
        ...entry

    }

    patients.push(newPatientEntry);
    return newPatientEntry;
}

export default { getPatients, getNonSsnPatients, addPatient }