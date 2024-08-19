import {Router} from 'express'
import { getCurrentUser, Login, logout, Signup } from '../controllers/userController.js'
const router = Router()
router.post('/signup',Signup)
router.post('/login', Login);
router.get('/current-user', getCurrentUser);
router.post('/logout', logout);

export default router