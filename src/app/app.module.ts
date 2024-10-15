import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { AddGameComponent } from './add-game/add-game.component';
import { UpdateGameComponent } from './update-game/update-game.component';
import { RechercheParStudioComponent } from './recherche-par-studio/recherche-par-studio.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ListeStudiosComponent } from './liste-studios/liste-studios.component';
import { UpdateStudioComponent } from './update-studio/update-studio.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { GameGuard } from './game.guard';


@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    AddGameComponent,
    UpdateGameComponent,
    RechercheParStudioComponent,
    RechercheParNomComponent,
    SearchFilterPipe,
    ListeStudiosComponent,
    UpdateStudioComponent,
    LoginComponent,
    ForbiddenComponent  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,   

    

  ],
  providers: [
    provideClientHydration(),
      provideHttpClient(withInterceptorsFromDi()),
      [GameGuard],
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
