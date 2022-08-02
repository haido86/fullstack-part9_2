import express from 'express';
import PatientEntries from '../../data/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(PatientEntries);
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;
