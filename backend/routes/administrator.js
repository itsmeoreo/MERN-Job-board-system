import Express from "express";
import adminController from "../controllers/adminController.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const administrator_router = Express.Router();

administrator_router.post("/register", adminController.register);

administrator_router.post("/", adminController.login);

// administrator_router.get('/all-seekers')

// administrator_router.get('/all-providers')

// administrator_router.get('/all-companies')

administrator_router.get("/all_requests", adminController.allVerifyRequests);

administrator_router.put("/verify/:company/yes", adminMiddleware, adminController.verifyCompany);

administrator_router.delete('/verify/:company/No', adminController.verifyFailedCompany);

administrator_router.post('/user-block/:username', adminController.block);

// administrator_router.delete('/:company')

// administrator_router.delete('/:provider')

// administrator_router.delete('/:seeker')

export default administrator_router;