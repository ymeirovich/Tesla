/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EtlDataService } from './etl-data.service';

describe('EtlDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EtlDataService]
    });
  });

  it('should ...', inject([EtlDataService], (service: EtlDataService) => {
    expect(service).toBeTruthy();
  }));
});
