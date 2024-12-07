import { Router } from 'express';
import { coursesController } from '../controllers/coursesController.js'; 
import validators from '../middlewares/validator.js';

const courseRouter = Router();

// Fetch data from all courses
courseRouter.get('/api/courses', coursesController.getAllCourses);

// Fetch data from a course by id
courseRouter.get('/api/courses/:course_id(\\d+)', coursesController.getOneCourseById);

// create a course
courseRouter.post('/api/courses', validators('courses'), coursesController.createCourse);

//update a course
courseRouter.patch('/api/courses/:course_id(\\d+)',validators('courses'), coursesController.updateCourse);

// delete a course
courseRouter.delete('/api/courses/:course_id(\\d+)', coursesController.deleteCourse);

export { courseRouter };
