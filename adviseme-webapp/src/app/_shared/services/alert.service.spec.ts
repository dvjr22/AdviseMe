import { TestBed, inject } from '@angular/core/testing';

import { AlertService } from './alert.service';
import { ToasterModule, ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';


describe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertService,
                  ToasterService ],
    });
  });

  it('should be created', inject([AlertService], (service: AlertService) => {
    expect(service).toBeTruthy();
  }));
});
