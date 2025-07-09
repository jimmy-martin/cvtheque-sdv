import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../service/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';

import { UploadChoiceComponent } from './upload-choice.component';

describe('UploadChoiceComponent', () => {
  let component: UploadChoiceComponent;
  let fixture: ComponentFixture<UploadChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadChoiceComponent],
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatIconModule,
      ],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
