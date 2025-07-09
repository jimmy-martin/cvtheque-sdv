import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { ProfileService } from '../../service/profile/profile.service';
import { Profile } from '../../profile/models/profile.model';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  profile: Profile | null = null;
  loading = false;
  error = '';
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProfile(): void {
    const profileId = this.route.snapshot.paramMap.get('id');

    if (!profileId) {
      this.error = 'ID du profil manquant';
      return;
    }

    this.loading = true;
    this.error = '';

    // Pour l'instant, on récupère tous les profils et on filtre par ID
    // Plus tard, vous pourrez créer un endpoint spécifique /api/profiles/{id}
    this.profileService
      .getProfiles()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (profiles) => {
          const foundProfile = profiles.find((p) => p.id === +profileId);
          if (foundProfile) {
            this.profile = foundProfile;
          } else {
            this.error = 'Profil non trouvé';
          }
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erreur lors du chargement du profil';
          this.loading = false;
          console.error('Erreur lors du chargement du profil:', error);
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/profiles']);
  }

  contactProfile(): void {
    // TODO: Implémenter la fonctionnalité de contact
    console.log('Contacter le profil:', this.profile?.firstName);
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  downloadCV(): void {
    if (this.profile?.cvUrl) {
      const link = document.createElement('a');
      link.href = this.profile.cvUrl;
      link.download = `CV_${this.profile.firstName}_${this.profile.lastName}.pdf`;
      link.target = '_blank';
      link.click();
    }
  }

  openCVInNewTab(): void {
    if (this.profile?.cvUrl) {
      window.open(this.profile.cvUrl, '_blank');
    }
  }

  shareByEmail(): void {
    // TODO: Implémenter la fonctionnalité de partage par email
    console.log('Partager le profil par email:', this.profile?.firstName, this.profile?.lastName);
  }

}
