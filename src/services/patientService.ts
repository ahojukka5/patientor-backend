import { generateUUIDv4 } from '@bitjourney/uuid-v4';

import patientData from '../../data/patients';

import { NonSensitivePatient, Patient, NewPatient, Entry, NewEntry } from '../types';

import { toNewPatient } from '../utils';

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

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = { id: generateUUIDv4(), ...entry };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((d) => d.id == id);
  return patient;
};

const addPatientEntry = (patientId: string, entry: NewEntry): Entry => {
  const newPatientEntry = { id: generateUUIDv4(), ...entry } as Entry;
  const patient = findById(patientId);
  if (!patient) {
    throw Error(`Patient with id ${patientId} not found.`);
  }
  const entries = patient.entries;
  entries.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  addPatientEntry,
  findById,
};
