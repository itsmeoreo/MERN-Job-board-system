import express from 'express'
import jobController from '../controllers/jobController.js'
import authMiddleware from '../middlewares/authMiddleware.js';

const job_router= express.Router();

job_router.get('/single_job/:id', jobController.getSingleJob)

job_router.get('/all_jobs', jobController.getAllJobs)

job_router.get('/:username/all_jobs', jobController.getAllJobsByOne)

job_router.get('/:job_id/applications', authMiddleware, jobController.getApplications)

job_router.get('/:job_id/single_application', authMiddleware, jobController.getSingleApplication)

job_router.put('/:job_id/:application_id/:result', authMiddleware,jobController.result )
//payload is wether company_name or username

job_router.put('/:job_id/close', authMiddleware, jobController.closeJob)

export default job_router;