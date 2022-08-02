import patientData from '../../data/patients';
import {
  PatientEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
} from '../types';
import { v1 as uuid } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const id = uuid();

const patients: Array<PatientEntry> = patientData;
const getPatients = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: id,
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitiveEntries,
  addPatient,
};
