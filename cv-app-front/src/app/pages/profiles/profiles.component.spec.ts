import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProfilesComponent } from './profiles.component';
import { ProfileService } from '../../service/profile/profile.service';

describe('ProfilesComponent', () => {
  let component: ProfilesComponent;
  let fixture: ComponentFixture<ProfilesComponent>;
  let profileService: ProfileService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilesComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
      ],
      providers: [ProfileService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilesComponent);
    component = fixture.componentInstance;
    profileService = TestBed.inject(ProfileService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty filters initially', () => {
    expect(component.firstNameFilter).toBe('');
    expect(component.cityFilter).toBe('');
  });

  it('should clear filters when clearFilters is called', () => {
    component.firstNameFilter = 'test';
    component.cityFilter = 'test';
    component.clearFilters();

    expect(component.firstNameFilter).toBe('');
    expect(component.cityFilter).toBe('');
  });

  it('should have debounce methods', () => {
    expect(component['onFirstNameFilterChange']).toBeDefined();
    expect(component['onCityFilterChange']).toBeDefined();
  });
});
