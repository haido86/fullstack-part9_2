import patientData from '../../data/patients';
import { Patient, NewPatient, PublicPatient, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const id = uuid();

const patients: Array<Patient> = patientData;
const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const foundPatient = patients.find((patient) => patient.id === id);
  return foundPatient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: id,
    ...patient,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: EntryWithoutId) => {
  const newEntry = { id: id, ...entry };
  patients.map((patient) =>
    patient.id === patientId
      ? {
          ...patient,
          entries: patient.entries
            ? patient.entries.push(newEntry)
            : [newEntry],
        }
      : patient
  );
  return newEntry;
};

export default {
  getPatients,
  getNonSensitiveEntries,
  getPatientById,
  addPatient,
  addEntry,
};
