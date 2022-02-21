import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { useParams } from 'react-router-dom';
import { useStateValue, addEntry } from '../state';
import { Patient, Entry } from '../types';
import { Icon, Button } from 'semantic-ui-react';
import Hospital from './Hospital';
import OccupationalHealthcare from './OccupationalHealthcare';
import HealthCheck from './HealthCheck';
import { AddEntryModal } from '../AddPatientModal';
import { EntryFormValues } from '../AddPatientModal/AddPatientForm';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientPage = () => {

  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();
  const foundPatient = Object.values(patients).find((patient: Patient) => patient.id === id);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${values.id}/entries`,
        values
      );
      dispatch(addEntry(values.id, newEntry));
      foundPatient && foundPatient.entries.push(newEntry);
      closeModal();
    } catch (e: any) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };


  const patientGender = () => {
    if(foundPatient?.gender === 'male'){
      return <Icon name="man"/>;
    } else if(foundPatient?.gender === 'female'){
      return <Icon name="woman"/>;
    } else {
      return <Icon name="genderless"/>;
    }
  };

  if (foundPatient) {
    return (
      <div>
        <h2>
          {foundPatient.name} 
          {patientGender()}
        </h2>
        <p>Ssh: {foundPatient.ssn}</p>
        <p>Occupation: {foundPatient.occupation}</p>
        <h3>Entries</h3>
        {foundPatient.entries.map((entry: Entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
        <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
            patientId={foundPatient.id}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
      </div>
    );
  } else {
    return <h2>No patient found</h2>;
  }
};

export default PatientPage;