import { generateUUIDv4 } from '@bitjourney/uuid-v4';

import patientData from '../../data/patients.json';

import { NonSensitivePatient, Patient, NewPatient } from '../types';

import toNewPatient from '../utils';

const patients: Array<Patient> = patientData.map((obj) => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (entry: NewPatient): Patient => {
  const newPatientEntry = { id: generateUUIDv4(), ...entry };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((d) => d.id == id);
  return patient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  findById,
};
