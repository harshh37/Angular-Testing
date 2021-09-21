import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesModule } from '../courses.module';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from '../services/courses.service';
import { HttpClient } from '@angular/common/http';
import { COURSES } from '../../../../server/db-data';
import { setupCourses } from '../common/setup-test-data';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { click } from '../common/test-utils';
import { Course } from '../model/course';

describe('HomeComponent', () => {
    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;
    let el: DebugElement;
    let courseService: any;
    let beginner: Array<Course> = setupCourses().filter((el) => el.category == 'BEGINNER');
    let advanced: Array<Course> = setupCourses().filter((el) => el.category == 'ADVANCED');

    beforeEach(fakeAsync(() => {
        let courseSpyService = jasmine.createSpyObj('CoursesService', ['findAllCourses']);

         TestBed.configureTestingModule({
            imports: [CoursesModule, NoopAnimationsModule],
            providers: [{ provide: CoursesService, useValue: courseSpyService }],
        }).compileComponents();

        flushMicrotasks();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      courseService = TestBed.inject(CoursesService);
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display only beginner courses', () => {
        courseService.findAllCourses.and.returnValue(of(beginner));
        fixture.detectChanges();

        const tabs = el.queryAll(By.css('.mat-tab-label-content'));
        expect(tabs.length).toBe(1);
    });

    it('should display only advanced courses', () => {
        courseService.findAllCourses.and.returnValue(of(advanced));
        fixture.detectChanges();

        const tabs = el.queryAll(By.css('.mat-tab-label-content'));
        expect(tabs.length).toBe(1);
    });

    it('should display both tabs', () => {
        courseService.findAllCourses.and.returnValue(of(setupCourses()));
        fixture.detectChanges();

        const tabs = el.queryAll(By.css('.mat-tab-label-content'));
        expect(tabs.length).toBe(2);
    });

    it('should display advanced courses when tab clicked', fakeAsync(() => {

        courseService.findAllCourses.and.returnValue(of(setupCourses()));
        fixture.detectChanges();

        const tabs = el.queryAll(By.css('.mat-tab-label'));
        expect(tabs.length).toBe(2);
        click(tabs[1]) ;

        fixture.detectChanges();
    
        flush();

        const cards = el.queryAll(By.css('.mat-tab-body-active .mat-card-title'));
        expect(cards.length).toBeGreaterThan(0, 'Could not find cards');
        expect(cards[0].nativeElement.textContent).toContain('Angular Security Course');
        
          
    }));
});
