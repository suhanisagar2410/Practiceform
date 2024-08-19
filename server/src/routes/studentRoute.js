import {Router} from 'express'
import { addStudent, deleteStudent, editStudent, getStudentById, listStudent } from '../controllers/studentDataController.js';
import multer from 'multer';
import path from 'path';

const router = Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/images/'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
  });
  
  const upload = multer({ storage });
  router.post('/add-student', upload.single('image'), addStudent);
  router.get('/list-student',listStudent)
  router.put('/edit-student/:id', upload.single('image'), editStudent);
  router.get('/get-student-by-id/:id', getStudentById);
  router.delete('/delete-student/:id', deleteStudent);
export default router