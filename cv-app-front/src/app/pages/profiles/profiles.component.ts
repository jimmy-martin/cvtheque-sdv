import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ProfileService } from '../../service/profile/profile.service';
import { Profile } from '../../profile/models/profile.model';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit, OnDestroy {
  profiles: Profile[] = [];
  loading = false;
  error = '';

  // Filtres
  firstNameFilter = '';
  cityFilter = '';

  // Subjects pour le debounce
  private firstNameFilterSubject = new Subject<string>();
  private cityFilterSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.setupDebounce();
    this.loadProfiles();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProfiles(): void {
    this.loading = true;
    this.error = '';

    this.profileService
      .getProfiles(this.firstNameFilter, this.cityFilter)
      .subscribe({
        next: (profiles) => {
          this.profiles = profiles;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erreur lors du chargement des profils';
          this.loading = false;
          console.error('Erreur lors du chargement des profils:', error);
        },
      });
  }

  private setupDebounce(): void {
    // Debounce pour le filtre prénom (500ms)
    this.firstNameFilterSubject
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadProfiles();
      });

    // Debounce pour le filtre ville (500ms)
    this.cityFilterSubject
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadProfiles();
      });
  }

  onFirstNameFilterChange(): void {
    this.firstNameFilterSubject.next(this.firstNameFilter);
  }

  onCityFilterChange(): void {
    this.cityFilterSubject.next(this.cityFilter);
  }

  clearFilters(): void {
    this.firstNameFilter = '';
    this.cityFilter = '';
    this.loadProfiles();
  }

  viewProfileDetail(profileId: number): void {
    this.router.navigate(['/profiles', profileId]);
  }
}
