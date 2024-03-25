import Express from "express";
import companyCotroller from '../controllers/companyController.js'
import authMiddleware from "../middlewares/authMiddleware.js";

const company_router= Express.Router();

company_router.post('/register', companyCotroller.register)

company_router.post('/login', companyCotroller.login)

company_router.get('/user', authMiddleware, companyCotroller.getUser)

company_router.post('/new_job', authMiddleware, companyCotroller.newJob)

export default company_router;