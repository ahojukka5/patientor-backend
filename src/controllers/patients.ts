import express from 'express';

import toNewPatient from '../utils';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const newPatientEntry = toNewPatient({ ...req.body, entries: [] });
  const addedEntry = patientService.addEntry(newPatientEntry);
  res.send(addedEntry);
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

export default router;
