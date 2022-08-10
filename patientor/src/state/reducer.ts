import { State } from './state';
import { Patient } from '../types';

type ActionGetListPatient = {
  type: 'SET_PATIENT_LIST';
  payload: Patient[];
};
type ActionAddPatient = {
  type: 'ADD_PATIENT';
  payload: Patient;
};

export type Action = ActionGetListPatient | ActionAddPatient;
// | {
//     type: 'FILTER_PATIENT';
//     payload: string;
//   };

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
    // case 'FILTER_PATIENT':
    //   return {
    //     ...state,
    //     patients: {
    //       [action.payload]: state.patients[action.payload],
    //     },
    //   };
    default:
      return state;
  }
};
