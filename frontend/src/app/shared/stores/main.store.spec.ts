import { TestBed } from '@angular/core/testing';

import { MainStore } from './main.store';

describe('MainStore', () => {
  let service: MainStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
