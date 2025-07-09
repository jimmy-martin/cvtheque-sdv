import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { UploadCvComponent } from './pages/upload-cv/upload-cv.component';
import { CompleteProfileComponent } from './pages/complete-profile/complete-profile.component';
import { UploadChoiceComponent } from './pages/upload-choice/upload-choice.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'upload-cv', component: UploadCvComponent },
  {
    path: 'profiles',
    component: ProfilesComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'profiles/:id',
    component: ProfileDetailComponent,
    canActivate: [AdminGuard],
  },
  { path: 'complete-profile', component: CompleteProfileComponent },
  { path: 'upload-choice', component: UploadChoiceComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
