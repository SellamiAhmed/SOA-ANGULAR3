import { Component } from '@angular/core';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { Studio } from '../model/studio.model';
import { Router } from '@angular/router';
import { StudioWrapper } from '../model/studioWrapped.model';
@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrl: './add-game.component.css'
})
export class AddGameComponent {
  newGame = new Game();
  studios: Studio[] = [];
  newIdStudio! : number ;
  newStudio !: Studio ;
message?: string;
constructor(private gameService: GameService,private router: Router
) { }

ngOnInit(): void {
  this.gameService.listeStudios().subscribe(studios => {
     
    if (Array.isArray(studios)) {
      this.studios = studios;
  } else {
      console.error('Studios is undefined or does not contain "studios" property');
  }
  

  });
  

}
addGame(){
  console.log( this.newIdStudio)
  this.newGame.studio = this.studios.find( studio => studio.idStudio == this.newIdStudio)!;
  
  this.gameService.ajouterGame(this.newGame).subscribe(pls => {
    
    this.router.navigate(['games']);
});
  this.message="Game :"+this.newGame.nomGame+" ajoute avec succes!";
}
}
