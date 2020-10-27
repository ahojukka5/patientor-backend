import express from 'express';

import { toNewPatient, toNewPatientEntry } from '../utils';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const newPatientEntry = toNewPatient({ ...req.body, entries: [] });
  const addedPatient = patientService.addPatient(newPatientEntry);
  res.send(addedPatient);
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatientEntry = patientService.addPatientEntry(
      req.params.id,
      newPatientEntry
    );
    res.send(addedPatientEntry);
  } catch (err) {
    res.sendStatus(404);
  }
});

export default router;
