import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { Http, Headers, RequestOptions, Response, ResponseOptions, BaseRequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { AppointmentService } from './appointment.service';
import { MockBackend } from '@angular/http/testing';

describe('AppointmentService', () => {

  let service: AppointmentService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppointmentService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (bkg, options) => new Http(bkg, options),
          deps: [MockBackend, BaseRequestOptions],
        },
      ],
    });

    // Setup the Mock Backend
    backend = TestBed.get(MockBackend);

    // Returns a service so we can test dummy (like ethan) reponses
    service = TestBed.get(AppointmentService);
  });

  it('getAll should return some appointments', fakeAsync(() => {
    // Data for the MockBackend to return
    const response = {
          'status': 200,
          'data': {
              'docs': [
                  {
                      '_id': '5a1ef7d1a18817601447466f',
                      'studentID': 'tHall01',
                      'firstName': 'Tyler',
                      'lastName': 'Hall',
                      'status': 'senior',
                      'advisor': 'Captain America',
                      'roomNumber': '211A',
                      'date': '2017-03-18T16:00:00.000Z',
                      'major': 'cs',
                  },
                  {
                      '_id': '5a235145b0a78a16acd79056',
                      'studentID': 'G2jsC',
                      'firstName': 'Tyler',
                      'lastName': 'Moon',
                      'status': 'freshman',
                      'advisor': 'Your Mom',
                      'roomNumber': '2A12',
                      '__v': 0,
                      'date': '2017-12-14T00:00:00.000Z',
                      'major': 'cs',
                  },
                  {
                      '_id': '5a2351b8b0a78a16acd79057',
                      'studentID': 'G2jsC',
                      'firstName': 'Tyler',
                      'lastName': 'Moon',
                      'status': 'freshman',
                      'advisor': 'Y',
                      'roomNumber': '2a12',
                      '__v': 0,
                      'date': '2017-12-12T00:00:00.000Z',
                      'major': 'cs',
                  },
              ],
              'total': 21,
              'limit': 10,
              'page': 1,
              'pages': 3,
          },
          'message': 'Successfully found Appointment',
      }; // END response



      // When the request subscribes for results on a connection, return a fake response
      backend.connections.subscribe(connection => {
        connection.mockRespond(new Response(<ResponseOptions> {
          body: JSON.stringify(response),
        }));
      });

      let appointments: any;
      service.getAll().subscribe( res => {
        appointments = res['data']['docs'];
      });

      // Wait for all promises and awaits to return
      tick();

      // Expectations
      expect(appointments.length).toBe(3);
      expect(appointments[0].advisor).toBe('Captain America');
      expect(appointments[1].firstName).toBe('Tyler');
  }));
});
