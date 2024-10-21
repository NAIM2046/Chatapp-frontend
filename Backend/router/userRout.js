import express from 'express';
import { getUserProfile, login, logout, signup } from './../controller/userControlle.js'; // Use named import for signup function
import secureRoute from '../middleware/secureRoute.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login' , login) ; 
router.post('/logout' , logout) ;
router.get("/allusers" , secureRoute,getUserProfile ) ;

export default router; // Use ES module export syntax
