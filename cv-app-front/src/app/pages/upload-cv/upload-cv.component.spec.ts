import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatHint } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

import { UploadCvComponent } from './upload-cv.component';

describe('UploadCvComponent', () => {
  let component: UploadCvComponent;
  let fixture: ComponentFixture<UploadCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadCvComponent, MatError, MatHint],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatButtonModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
