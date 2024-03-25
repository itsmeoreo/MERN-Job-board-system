import Express from "express";
import notificationController from "../controllers/notificationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const notification_router= Express.Router();

notification_router.post('/new/:content/:receiver/:job', authMiddleware, notificationController.postNewNotification)

notification_router.get('/all', authMiddleware, notificationController.getAllNotifications);

notification_router.patch('/:notification/seen', authMiddleware, notificationController.notificationSeen)

export default notification_router;