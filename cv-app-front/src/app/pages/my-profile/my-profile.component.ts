import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../service/auth/auth.service';
import { ProfileService } from '../../service/profile/profile.service';
import { CompleteProfilePayload } from '../../auth/models/auth-register.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  profileForm: FormGroup;
  isLoading = false;
  isEditing = false;
  currentProfile: any = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.isLoading = true;
    this.profileService.getMyProfile().subscribe({
      next: (profile) => {
        this.currentProfile = profile;
        this.profileForm.patchValue({
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          phone: profile.phone || '',
          city: profile.city || '',
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du profil:', error);
        this.snackBar.open('Erreur lors du chargement du profil', 'Fermer', {
          duration: 4000,
          panelClass: ['snackbar-error'],
        });
        this.isLoading = false;
      },
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      // Annuler les modifications en rechargeant les données originales
      this.profileForm.patchValue({
        firstName: this.currentProfile.firstName || '',
        lastName: this.currentProfile.lastName || '',
        phone: this.currentProfile.phone || '',
        city: this.currentProfile.city || '',
      });
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.isLoading = true;

      const profileData: CompleteProfilePayload = this.profileForm.value;

      this.profileService.updateProfile(profileData).subscribe({
        next: (updatedProfile) => {
          this.currentProfile = updatedProfile;
          this.isEditing = false;
          this.isLoading = false;
          this.snackBar.open('Profil mis à jour avec succès !', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
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

  getUserInfo() {
    return {
      email: this.authService.getUserEmail(),
      roles: this.authService.getUserRoles(),
      userId: this.authService.getUserId(),
    };
  }
}
