import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProfileService } from './profile.service';
import { Profile } from '../../profile/models/profile.model';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService],
    });
    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve profiles from API without filters', () => {
    const mockProfiles: Profile[] = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        city: 'Paris',
        email: 'john@example.com',
        bio: 'Développeur passionné',
        cvUrl: 'http://example.com/cv.pdf',
      },
    ];

    service.getProfiles().subscribe((profiles) => {
      expect(profiles).toEqual(mockProfiles);
    });

    const req = httpMock.expectOne('http://localhost:8082/api/profiles');
    expect(req.request.method).toBe('GET');
    req.flush(mockProfiles);
  });

  it('should retrieve profiles from API with firstName filter', () => {
    const mockProfiles: Profile[] = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        city: 'Paris',
        email: 'john@example.com',
        bio: 'Développeur passionné',
        cvUrl: 'http://example.com/cv.pdf',
      },
    ];

    service.getProfiles('John').subscribe((profiles) => {
      expect(profiles).toEqual(mockProfiles);
    });

    const req = httpMock.expectOne(
      'http://localhost:8082/api/profiles?firstName=John'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProfiles);
  });

  it('should retrieve profiles from API with city filter', () => {
    const mockProfiles: Profile[] = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        city: 'Paris',
        email: 'john@example.com',
        bio: 'Développeur passionné',
        cvUrl: 'http://example.com/cv.pdf',
      },
    ];

    service.getProfiles(undefined, 'Paris').subscribe((profiles) => {
      expect(profiles).toEqual(mockProfiles);
    });

    const req = httpMock.expectOne(
      'http://localhost:8082/api/profiles?city=Paris'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProfiles);
  });

  it('should retrieve profiles from API with both filters', () => {
    const mockProfiles: Profile[] = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        city: 'Paris',
        email: 'john@example.com',
        bio: 'Développeur passionné',
        cvUrl: 'http://example.com/cv.pdf',
      },
    ];

    service.getProfiles('John', 'Paris').subscribe((profiles) => {
      expect(profiles).toEqual(mockProfiles);
    });

    const req = httpMock.expectOne(
      'http://localhost:8082/api/profiles?firstName=John&city=Paris'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProfiles);
  });
});
