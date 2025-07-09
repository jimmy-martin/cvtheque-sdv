import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CvService } from 'src/app/service/cv/cv-upload.service';
import { AuthService } from 'src/app/service/auth/auth.service';
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

  constructor(
    private fb: FormBuilder,
    private cvService: CvService,
    private authService: AuthService
  ) {}

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

    // Vérifier si l'utilisateur est authentifié
    if (!this.authService.isAuthenticated()) {
      this.uploadError = 'Vous devez être connecté pour uploader un CV.';
      this.uploadSuccess = null;
      return;
    }

    this.cvService.uploadCV(this.selectedFile).subscribe({
      next: () => {
        this.uploadSuccess = 'CV téléchargé avec succès !';
        this.uploadError = null;
        this.selectedFile = null;
        this.fileName = '';
      },
      error: (error: HttpErrorResponse | Error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 413) {
            this.uploadError =
              'Le fichier est trop volumineux. Taille maximale autorisée : 10MB.';
          } else if (error.status === 0) {
            this.uploadError =
              'Erreur réseau ou CORS : le serveur ne répond pas.';
          } else {
            this.uploadError = `Échec du téléchargement : ${error.message}`;
          }
        } else {
          // Gestion des erreurs non-HTTP (comme l'erreur d'authentification)
          this.uploadError = error.message;
        }
        this.uploadSuccess = null;
      },
    });
  }

  onSubmit() {
    this.uploadCV();
  }
}
