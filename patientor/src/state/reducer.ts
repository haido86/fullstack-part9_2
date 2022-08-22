import { State } from './state';
import { Diagnosis, HealthCheckEntry, Patient } from '../types';

type ActionGetListPatient = {
  type: 'SET_PATIENT_LIST';
  payload: Patient[];
};
type ActionAddPatient = {
  type: 'ADD_PATIENT';
  payload: Patient;
};
type ActionAddEntry = {
  type: 'ADD_ENTRY';
  payload: { patient: Patient; entry: HealthCheckEntry };
};

type ActionGetDiagnose = {
  type: 'GET_DIAGNOSES';
  payload: Diagnosis[];
};

export type Action =
  | ActionGetListPatient
  | ActionAddPatient
  | ActionAddEntry
  | ActionGetDiagnose;

export const setPatientList = (data: Patient[]): ActionGetListPatient => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: data,
  };
};

export const addPatient = (data: Patient): ActionAddPatient => {
  return {
    type: 'ADD_PATIENT',
    payload: data,
  };
};
export const addEntry = (
  patient: Patient,
  entry: HealthCheckEntry
): ActionAddEntry => {
  return {
    type: 'ADD_ENTRY',
    payload: { patient, entry },
  };
};
export const getDiagnoses = (data: Diagnosis[]): ActionGetDiagnose => {
  return {
    type: 'GET_DIAGNOSES',
    payload: data,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'ADD_ENTRY':
      const { patient, entry } = action.payload;

      patient.entries.push(entry);

      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patient.id]: patient,
        },
      };

    case 'GET_DIAGNOSES':
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses,
        },
      };

    default:
      return state;
  }
};
