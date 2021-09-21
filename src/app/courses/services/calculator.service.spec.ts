import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe("CalculatorService",()=>{
  let loggerSpy :any;
  let calculator : CalculatorService;

  beforeEach(()=>{
    loggerSpy =  jasmine.createSpyObj('LoggerService', ['log']);
    TestBed.configureTestingModule({
      providers:[ 
        CalculatorService, 
        {provide: LoggerService, useValue: loggerSpy}   /*make spyObj of dependent service of a service */
      ]
    })
    calculator = TestBed.inject(CalculatorService);   /*using inject instead of get */
  })

  it("It should add two numbers",()=>{
    const add = calculator.add(2,3);
    expect(add).toBe(5);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    //  pending();
  })
  

  it("It should subtract two numbers",()=>{
    const sub =  calculator.subtract(2,2);
     expect(sub).toBe(0, "Unexpected subtraction result");
     expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    //  fail();
  })
})