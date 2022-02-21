import { NewPatientEntry, Gender, Entry, BaseEntry, HealthCheckRating } from './types';
import { v4 as uuid } from 'uuid';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (label: string, data: any): string => {
    if (!data || !isString(data)) {
      throw new Error(`Incorrect or missing string: ${label}`);
    }
  
    return data;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
}

const parseGender = (gender: unknown) : Gender =>{
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
}
  
const parseDate = (date: unknown): string => {
if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
}
return date;
};

const parseName = (name: unknown): string => {
    if(!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const parseSsn = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn' + ssn);
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation' + occupation);
    }
    return occupation;
};

const parseEntries = (entries: any): Entry[] => {
    if(!entries) {
        throw new Error('Incorrect or missing entries' + entries);
    }
    return entries;
}

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation, entries} : Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries)
  };
  return newEntry;
};

const parseArrayString = (label: string, data: any): string[] => {

    if (!data) {
      return [];
    }
  
    if (!Array.isArray(data)) {
      throw new Error(`Incorrect data: ${label}`);
    }
  
    data.forEach(code => {
      if (!isString(code)) {
        throw new Error(`Incorrect data: ${label}`);
      }
    });

    return data as string[];
};
  
const isRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};
  
const parseRating = (rating: any): HealthCheckRating => {
    if (!rating) {
      throw new Error(`Missing rating`);
    }
    const ratingNumber: number = parseInt(rating);
    if (isNaN(ratingNumber) || !isRating(ratingNumber)) {
      throw new Error(`Incorrect rating number: ${Object.values(HealthCheckRating).join(' | ')}`);
    }
    return ratingNumber;
};

const toNewEntry = (object: any): Entry => {
    const baseEntry: BaseEntry = {
      id: uuid(),
      description: parseString('description', object.description),
      date: parseDate(object.date),
      specialist: parseString('specialist', object.specialist),
      diagnosisCodes: parseArrayString('diagnosisCodes', object.diagnosisCodes),
    };
    if (!object.type || !isString(object.type)) {
      throw new Error(`Missing or invalid entry type`);
    }
    switch (object.type) {
      case 'HealthCheck':
        return {
          ...baseEntry,
          type: 'HealthCheck',
          healthCheckRating: parseRating(object.healthCheckRating)
        };
  
      case 'Hospital':
        return {
          ...baseEntry,
          type: 'Hospital',
          discharge: {
            date: parseDate(object.dischargeDate),
            criteria: parseString('dischargeCriteria', object.dischargeCriteria)
          }
        };
  
      case 'OccupationalHealthcare':
        let sickLeave;
        if (object.sickLeaveStartDate && object.sickLeaveEndDate) {
          sickLeave = {
            startDate: parseDate(object.sickLeaveStartDate),
            endDate: parseDate(object.sickLeaveEndDate)
          };
        }
        return {
          ...baseEntry,
          type: 'OccupationalHealthcare',
          employerName: parseString('employerName', object.employerName),
          sickLeave
        };
  
      default:
        throw new Error(`Incorrect entry type`);
    }
}


export { toNewPatientEntry, toNewEntry };