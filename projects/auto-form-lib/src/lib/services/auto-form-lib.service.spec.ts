import { TestBed } from '@angular/core/testing';

import { AutoFormLibService } from './auto-form-lib.service';

describe('AutoFormLibService', () => {
  let service: AutoFormLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoFormLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
