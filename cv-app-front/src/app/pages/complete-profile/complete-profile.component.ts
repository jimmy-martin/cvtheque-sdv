import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../service/auth/auth.service';
import { ProfileService } from '../../service/profile/profile.service';
import { CompleteProfilePayload } from '../../auth/models/auth-register.model';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss'],
})
export class CompleteProfileComponent implements OnInit {
  completeProfileForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private snackBar: MatSnackBar
  ) {
    this.completeProfileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    // Vérifier si l'utilisateur est connecté
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
  }

  onSubmit() {
    if (this.completeProfileForm.valid) {
      this.isLoading = true;

      const profileData: CompleteProfilePayload =
        this.completeProfileForm.value;

      this.profileService.updateProfile(profileData).subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open('Profil complété avec succès !', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });

          // Rediriger vers la page de choix d'upload
          this.router.navigate(['/upload-choice']);
        },
        error: () => {
          this.isLoading = false;
          this.snackBar.open(
            'Erreur lors de la mise à jour du profil',
            'Fermer',
            {
              duration: 4000,
              panelClass: ['snackbar-error'],
            }
          );
        },
      });
    }
  }

  skipProfile() {
    this.router.navigate(['/upload-choice']);
  }
}
