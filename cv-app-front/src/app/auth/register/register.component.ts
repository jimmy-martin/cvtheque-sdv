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
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private snackBar: MatSnackBar){
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+=\\-{}\\[\\]:;"\'<>,.?/]).{8,}$')
      ]],
      role: ['USER']  
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.snackBar.open('Inscription réussie 🎉', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          this.router.navigate(['/login']);
        },
        error: (httpError: HttpErrorResponse) => {
          const message = httpError.error.message || 'Erreur lors de l’inscription ❌';
          this.snackBar.open(message, 'Fermer', {
            duration: 4000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }
}


