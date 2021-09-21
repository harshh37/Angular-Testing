import { TestBed } from "@angular/core/testing"
import { LoggerService } from "./logger.service"


describe("LoggerService",()=>{

  let logger: LoggerService;
   
  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers: [LoggerService]
    })

    logger = TestBed.inject(LoggerService)

  })

  it("should have log function", ()=>{
  expect(logger.log).toBeTruthy();
  })

})