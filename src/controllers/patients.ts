import express from 'express';

import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientEntry = patientService.addEntry({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.send(newPatientEntry);
});

export default router;
