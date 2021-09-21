import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';




describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el:DebugElement;

  beforeEach(async ()=>{
     TestBed.configureTestingModule({
       imports:[CoursesModule]
     }).compileComponents().then(_=>{
      fixture = TestBed.createComponent(CoursesCardListComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
     })
  })


  it("should create the component", () => {
    expect(component).toBeTruthy();
  });


  it("should display the course list", () => {
     component.courses = setupCourses();
      fixture.detectChanges();
    
     const cards = el.queryAll(By.css(".course-card"));

     expect(cards).toBeTruthy("Could not find cards");
     expect(cards.length).toBe(12);

  });


  it("should display the first course", () => {
    component.courses =  setupCourses();
    fixture.detectChanges();
    const course =  component.courses[0];

    const card = el.query(By.css(".course-card:first-child")),
          header = card.query(By.css("mat-card-header")), 
          img = card.query(By.css("img"));
          // test = header.nativeElement.textContent;
          // console.log(img.nativeElement.src);

          expect(header.nativeElement.textContent).toBe(course.titles.description);
          expect(img.nativeElement.src).toBe(course.iconUrl)
       

  });


});


