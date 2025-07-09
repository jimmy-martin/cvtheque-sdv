import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-upload-choice',
  templateUrl: './upload-choice.component.html',
  styleUrls: ['./upload-choice.component.scss'],
})
export class UploadChoiceComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Vérifier si l'utilisateur est connecté
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
  }

  uploadCV() {
    this.router.navigate(['/upload-cv']);
  }

  skipUpload() {
    this.router.navigate(['/home']);
  }
}
