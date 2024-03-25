import Express from 'express'
import providerController from '../controllers/providerController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import uploadFile from '../middlewares/fileUpload.js';

const provider_router= Express.Router();

provider_router.post('/register', providerController.register );

provider_router.post('/login', providerController.login );

provider_router.get('/users/:id', providerController.getAnyUser)

provider_router.get('/user', authMiddleware, providerController.getUser );

provider_router.put('/user/update', authMiddleware, uploadFile.single('profile_picture'), providerController.updateUser)

provider_router.post('/new_job', authMiddleware, providerController.newJob);

export default provider_router;