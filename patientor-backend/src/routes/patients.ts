import express from 'express';
import patientService from '../services/patientService';
import { EntryWithoutId } from '../types';
import { toNewEntry, toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});
router.get('/:id', (req, res) => {
  const id = req.params.id;

  res.send(patientService.getPatientById(id));
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatientEntry = patientService.addPatient(newPatientEntry);
    res.json(addedPatientEntry);
  } catch (error) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += 'Error' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (
      !req.body ||
      (req.body.type !== 'HealthCheck' &&
        req.body.type !== 'OccupationalHealthcare' &&
        req.body.type !== 'Hospital')
    ) {
      return res.status(400).send('wrong entry type');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body) as EntryWithoutId;

    const addedEntry = patientService.addEntry(id, newEntry);
    return res.json(addedEntry);
  } catch (error) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += 'Error' + error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

export default router;
