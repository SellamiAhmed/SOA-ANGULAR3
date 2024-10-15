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
import { AuthGuard } from './game.guard'; // Import AuthGuard

const routes: Routes = [
  {
    path: 'games',
    component: GamesComponent,
    canActivate: [AuthGuard], // Protect this route with AuthGuard
  },
  {
    path: 'add-game',
    component: AddGameComponent,
    canActivate: [AuthGuard, GameGuard], // Protect this route with AuthGuard and GameGuard
  },
  {
    path: 'updateGame/:id',
    component: UpdateGameComponent,
    canActivate: [AuthGuard], // Protect this route with AuthGuard
  },
  {
    path: 'rechercheParStudio',
    component: RechercheParStudioComponent,
    canActivate: [AuthGuard], // Protect this route with AuthGuard
  },
  {
    path: 'rechercheParNom',
    component: RechercheParNomComponent,
    canActivate: [AuthGuard], // Protect this route with AuthGuard
  },
  {
    path: 'listeStudios',
    component: ListeStudiosComponent,
    canActivate: [AuthGuard], // Protect this route with AuthGuard
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
  {
    path: '**',
    redirectTo: 'games',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [GameGuard, AuthGuard], // Provide AuthGuard
})
export class AppRoutingModule {}