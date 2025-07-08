import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginPayload } from '../models/auth-login.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const payload: LoginPayload = this.loginForm.value;

      this.authService.login(payload).subscribe({
        next: (res) => {
          sessionStorage.setItem('token', res.token);
          this.snackBar.open('Connexion réussie ✅', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          this.router.navigate(['/']);
        },
        error: (err) => {
          const message = err?.error?.message || 'Échec de la connexion ❌';
          this.snackBar.open(message, 'Fermer', {
            duration: 4000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }
}
