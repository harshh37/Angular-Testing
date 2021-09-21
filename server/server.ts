

import * as express from 'express';
import {Application} from "express";
import * as cors from 'cors';
import {getAllCourses, getCourseById} from "./get-courses.route";
import {searchLessons} from "./search-lessons.route";
import {saveCourse} from './save-course.route';

const bodyParser = require('body-parser');

const app: Application = express();

app.use(cors());
app.use('*', cors());
app.use(bodyParser.json());


app.route('/api/courses').get(getAllCourses);

app.route('/api/courses/:id').get(getCourseById);

app.route('/api/lessons').get(searchLessons);

app.route('/api/courses/:id').put(saveCourse);


app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:9000");
});




