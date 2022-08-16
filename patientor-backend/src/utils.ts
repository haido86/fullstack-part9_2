import { Gender, NewPatient, EntryWithoutId, HealthCheckRating } from './types';

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

const isDate = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): string => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  };
  return newPatient;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing ssn: ' + description);
  }

  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing ssn: ' + specialist);
  }

  return specialist;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing gender: ' + healthCheckRating);
  }

  return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing ssn: ' + employerName);
  }

  return employerName;
};

type InputEntryFields = {
  type: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  healthCheckRating: unknown;
  employerName: unknown;
};

export const toNewEntry = (entry: InputEntryFields): EntryWithoutId | Error => {
  const { description, date, specialist, healthCheckRating, employerName } =
    entry;

  switch (entry.type) {
    case 'HealthCheck':
      return {
        type: 'HealthCheck',
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
    case 'OccupationalHealthcare':
      return {
        type: 'OccupationalHealthcare',
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        employerName: parseEmployerName(employerName),
      };
    case 'Hospital':
      return {
        type: 'Hospital',
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
      };
    default:
      return {
        name: 'Not correct type',
        message: 'Not correct type',
      };
  }
};
