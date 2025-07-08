import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { UploadCvComponent } from './pages/upload-cv/upload-cv.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  {
    path: 'upload-cv',
    component: UploadCvComponent,
  },
  { path: 'profiles', component: ProfilesComponent },
  { path: 'profiles/:id', component: ProfileDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
