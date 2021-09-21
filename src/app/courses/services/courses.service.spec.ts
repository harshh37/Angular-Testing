import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing"
import { CoursesService } from "./courses.service"
import {COURSES, findLessonsForCourse} from "../../../../server/db-data";
import {Course} from "../model/course";
import { HttpErrorResponse } from "@angular/common/http";



describe("CoursesService",() => {
  let coursesService : CoursesService;
  let httpTestController: HttpTestingController;

beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[
        CoursesService
      ]  
    })
    coursesService = TestBed.inject(CoursesService);
    httpTestController =  TestBed.inject(HttpTestingController);
  })


it("Should retrieve all courses",()=>{
  coursesService.findAllCourses().subscribe(courses =>{
    expect(courses).toBeTruthy("No courses returned");

    expect(courses.length).toBe(12);
  })

  const req =  httpTestController.expectOne('/api/courses');
  expect(req.request.method).toEqual('GET');
  req.flush({payload:Object.values(COURSES)});
})

it('should retrieve course by id', () => {

  coursesService.findCourseById(12).subscribe(course=>{
    expect(course).toBeTruthy('No course returned');
    expect(course.id).toBe(12);
  })

  const req = httpTestController.expectOne('/api/courses/12');
  expect(req.request.method).toEqual('GET');
  req.flush(COURSES[12]);

})

it('should save the course data', () => {
  let changes:Partial<Course> = {titles:{description: 'Testing Course'}};
  coursesService.saveCourse(12, changes).subscribe(data=>{
    expect(data).toBeTruthy('Not data returned');
    expect(data.id).toBe(12)
    
  })
  const req =  httpTestController.expectOne('/api/courses/12');
  expect(req.request.method).toEqual('PUT');
  expect(req.request.body.titles.description).toEqual(changes.titles.description);
  req.flush(COURSES[12]);

})

it('should give an error if save course fails', ()=>{
  let changes:Partial<Course> = {titles:{description: 'Testing Course'}};
  coursesService.saveCourse(12, changes).subscribe(()=>{
    fail('save course should have failed')
  },
  (err:HttpErrorResponse)=>{
    expect(err.status).toBe(500);
  })

  const req =  httpTestController.expectOne('/api/courses/12');
  expect(req.request.method).toEqual('PUT');
  req.flush('save course failed', {status:500, statusText:'Internal Server Error'});
})

it('should find a list of lessons',()=>{

  coursesService.findLessons(12).subscribe(data=>{
    expect(data).toBeTruthy('Not returned data');
    expect(data.length).toBe(3);
  })

  const req = httpTestController.expectOne(req=> req.url == '/api/lessons');
  expect(req.request.method).toEqual('GET');
  expect(req.request.params.get('courseId')).toEqual('12');
  expect(req.request.params.get('filter')).toEqual('');
  expect(req.request.params.get('sortOrder')).toEqual('asc');
  expect(req.request.params.get('pageNumber')).toEqual('0');
  expect(req.request.params.get('pageSize')).toEqual('3');

  req.flush({payload: findLessonsForCourse(12, ).slice(0,3)})

})

afterEach(()=>{
  httpTestController.verify();
})

})