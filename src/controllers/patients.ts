import express from 'express';

import toNewPatient from '../utils';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const newPatientEntry = toNewPatient(req.body);
  const addedEntry = patientService.addEntry(newPatientEntry);
  res.send(addedEntry);
});

export default router;
