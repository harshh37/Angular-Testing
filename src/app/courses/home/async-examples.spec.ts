import { fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('Asynchromous Test examples', () => {
    it('asynchronous test using- setTimeout', (done: DoneFn) => {
        let test = false;

        setTimeout(() => {
            test = true;
            console.log('test using setTimeout');
            expect(test).toBeTruthy();
            done();
        }, 500);
    });

    it('asynchronous test using- fakeAsync()-tick()', fakeAsync(() => {
        let test = false;

        setTimeout(() => {
            test = true;
            console.log('test using fakeAsync tick()');
            expect(test).toBeTruthy();
        }, 500);

        tick(500);
    }));

    it('asynchronous test using- fakeAsync()-flush()', fakeAsync(() => {
        let test = false;

        setTimeout(() => {
            test = true;
            console.log('test using fakeAsync flush()');
        }, 500);

        flush();
        expect(test).toBeTruthy();
    }));

    it('asynchronous test using- plain promise()', fakeAsync(() => {
        let test = false;

        console.log('Creating promise');
        Promise.resolve()
            .then(() => {
                console.log('first promise that goes into microtasks queue');
                return Promise.resolve();
            })
            .then(() => {
                test = true;
                console.log('second promise that goes into microtasks queue');
            });

        flushMicrotasks();

        console.log('execution completed');
        expect(test).toBeTruthy();
    }));



    it('asynchronous test using-Promises() + setTimeout()', fakeAsync(() => {  //Best example
        let counter = 0;

        console.log("Testing what I've learned so far!");
        Promise.resolve()
            .then(() => {
                console.log('first promise that goes into microtasks queue');
                counter = 10;

                setTimeout(() => {
                    counter += 1;
                });

                return Promise.resolve();
            })
            .then(() => {
                counter += 2;
                console.log('second promise that goes into microtasks queue');
            });

        expect(counter).toBe(0);
        flushMicrotasks();
        console.log('execution completed');

        expect(counter).toBe(12);
        tick();
        expect(counter).toBe(13);
    }));

    it('asynchronous test using - observables', fakeAsync(()=>{
      let test = false;

      console.log("creating observable");
      const val$ =  of(test).pipe(delay(1000)); // $--> It's a convention for Observables names

      val$.subscribe(()=>{
        test = true;
      })

      tick(1000);

      expect(test).toBeTruthy();
      console.log("execution completed");
    }));

});
