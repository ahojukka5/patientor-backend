import { generateUUIDv4 } from '@bitjourney/uuid-v4';

import patientData from '../../data/patients.json';

import {
  NonSensitivePatientEntry,
  PatientEntry,
  NewPatientEntry,
} from '../types';

import toNewPatientEntry from '../utils';

const patients: Array<PatientEntry> = patientData.map((obj) => {
  const object = toNewPatientEntry(obj) as PatientEntry;
  object.id = obj.id;
  return object;
});

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = { id: generateUUIDv4(), ...entry };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
};
