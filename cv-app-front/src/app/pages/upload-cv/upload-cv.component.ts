import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CvService } from 'src/app/service/cv/cv-upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.scss'],
})
export class UploadCvComponent {
  cvForm!: FormGroup;
  selectedFile: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  fileName = '';
  uploadError: string | null = null;
  uploadSuccess: string | null = null;

  constructor(private fb: FormBuilder, private cvService: CvService) {}
  ngOnInit(): void {
    this.cvForm = this.fb.group({});
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];

    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.errorMessage = '';
    } else {
      this.selectedFile = null;
      this.errorMessage = 'Veuillez sélectionner un fichier PDF uniquement.';
    }
  }

  uploadCV() {
    if (!this.selectedFile) {
      this.errorMessage = 'Veuillez sélectionner un fichier PDF.';
      return;
    }

    this.cvService.uploadCV(this.selectedFile).subscribe({
      next: () => {
        this.uploadSuccess = 'CV téléchargé avec succès !';
        this.uploadError = null;
        this.selectedFile = null;
        this.fileName = '';
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 413) {
          this.uploadError =
            'Le fichier est trop volumineux. Taille maximale autorisée : 10MB.';
        } else if (error.status === 0) {
          this.uploadError =
            'Erreur réseau ou CORS : le serveur ne répond pas.';
        } else {
          this.uploadError = `Échec du téléchargement : ${error.message}`;
        }
        this.uploadSuccess = null;
      },
    });
  }

  onSubmit() {
    this.uploadCV();
  }
}
