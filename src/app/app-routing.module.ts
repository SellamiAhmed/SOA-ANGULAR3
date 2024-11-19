import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { AddGameComponent } from './add-game/add-game.component';
import { UpdateGameComponent } from './update-game/update-game.component';
import { RechercheParStudioComponent } from './recherche-par-studio/recherche-par-studio.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeStudiosComponent } from './liste-studios/liste-studios.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { GameGuard } from './game.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

const routes: Routes = [
  { 
    path: 'register', component: RegisterComponent },

  { path: 'verifEmail', component: VerifEmailComponent },
  {
    path: 'games',
    component: GamesComponent,
  },
  {
    path: 'add-game',
    component: AddGameComponent,
    canActivate: [
      GameGuard,
    ], 
  },
  {
    path: 'updateGame/:id',
    component: UpdateGameComponent,
  },
  {
    path: 'rechercheParStudio',
    component: RechercheParStudioComponent,
  },
  {
    path: 'rechercheParNom',
    component: RechercheParNomComponent,
  },
  {
    path: 'listeStudios',
    component: ListeStudiosComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'app-forbidden',
    component: ForbiddenComponent,
  },
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full',
  },
  // {
  //   path: '**',
  //   redirectTo: 'games',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [GameGuard], // Provide AuthGuard
})
export class AppRoutingModule {}
