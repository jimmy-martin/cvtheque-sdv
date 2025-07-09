import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+=\\-{}\\[\\]:;"\'<>,.?/]).{8,}$'
          ),
        ],
      ],
      profileType: ['INTERVENANT', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;

      // Mapper le type de profil au rôle
      const role = formValue.profileType === 'ECOLE' ? 'ADMIN' : 'USER';

      const registerData = {
        email: formValue.email,
        password: formValue.password,
        role: role,
        profileType: formValue.profileType,
      };

      this.authService.register(registerData).subscribe({
        next: () => {
          this.snackBar.open('Inscription réussie 🎉', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
          // Rediriger vers la page de complétion de profil au lieu du login
          this.router.navigate(['/complete-profile']);
        },
        error: (httpError: HttpErrorResponse) => {
          const message =
            httpError.error.message || "Erreur lors de l'inscription ❌";
          this.snackBar.open(message, 'Fermer', {
            duration: 4000,
            panelClass: ['snackbar-error'],
          });
        },
      });
    }
  }
}
