import patientData from '../../data/patients';
import { PatientEntry } from '../types';

const patients: Array<PatientEntry> = patientData;
const getDiagnoses = (): Array<patientData> => {
  return patients;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose,
};
