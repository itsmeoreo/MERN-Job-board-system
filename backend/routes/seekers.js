import Express from "express";
import seekerController from "../controllers/seekerController.js"
import authMiddleware from "../middlewares/authMiddleware.js";
import uploadFile from "../middlewares/fileUpload.js";

const seeker_route= Express.Router();

seeker_route.post('/register', uploadFile.single("resume"), seekerController.register)

seeker_route.post('/login', seekerController.Login)

seeker_route.post('/logout', seekerController.logout)

seeker_route.put('/update', authMiddleware, uploadFile.single("resume"), seekerController.updateUser)

seeker_route.get('/user', authMiddleware , seekerController.getUser)

seeker_route.post('/apply/:job_id', authMiddleware, seekerController.createApplication)

export default seeker_route;