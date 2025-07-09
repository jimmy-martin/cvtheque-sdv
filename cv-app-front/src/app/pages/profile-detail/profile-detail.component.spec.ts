import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DomSanitizer } from '@angular/platform-browser';

import { ProfileDetailComponent } from './profile-detail.component';
import { ProfileService } from '../../service/profile/profile.service';
import { Profile } from '../../profile/models/profile.model';

describe('ProfileDetailComponent', () => {
  let component: ProfileDetailComponent;
  let fixture: ComponentFixture<ProfileDetailComponent>;
  let profileService: ProfileService;
  let mockActivatedRoute: any;

  const mockProfile: Profile = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    city: 'Paris',
    email: 'john@example.com',
    phone: '+33123456789',
    bio: 'Développeur passionné',
    avatar: 'http://example.com/avatar.jpg',
    cvUrl: 'http://example.com/cv.pdf',
  };

  beforeEach(async () => {
    mockActivatedRoute = {
      params: of({ id: '1' }),
      snapshot: {
        paramMap: {
          get: (key: string) => (key === 'id' ? '1' : null),
        },
      },
    };

    await TestBed.configureTestingModule({
      declarations: [ProfileDetailComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
      providers: [
        ProfileService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustResourceUrl: (url: string) => url,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileDetailComponent);
    component = fixture.componentInstance;
    profileService = TestBed.inject(ProfileService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with loading state', () => {
    expect(component.loading).toBe(true);
    expect(component.error).toBe('');
  });

  it('should have getSafeUrl method', () => {
    expect(component.getSafeUrl).toBeDefined();
  });
});
