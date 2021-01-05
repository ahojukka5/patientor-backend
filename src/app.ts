import process from 'process';
import express from 'express';
import cors from 'cors';
import pingRouter from './controllers/ping';
import diagnosesRouter from './controllers/diagnoses';
import patientsRouter from './controllers/patients';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);


process.on('SIGINT', function onSigint() {
    process.exit();
});

process.on('SIGTERM', function onSigterm() {
    process.exit();
});

export default app;
