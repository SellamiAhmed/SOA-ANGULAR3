import { Component } from '@angular/core';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { Studio } from '../model/studio.model';



@Component({
  selector: 'app-recherche-par-studio',
  templateUrl: './recherche-par-studio.component.html',
  styleUrl: './recherche-par-studio.component.css'
})
export class RechercheParStudioComponent {
  games! : Game[];
  IdStudio! : number;
  studios! : Studio[];
  constructor(private gameService: GameService) { }
  ngOnInit(): void {
    this.gameService.listeStudios().subscribe(studios => {
    if (Array.isArray(studios)) {
        this.studios = studios;
    } else {
        console.error('Studios is undefined or does not contain "studios" property');
    }
   
    });
    }
    onChange() {
      this.gameService.rechercherParStudio(this.IdStudio).subscribe(pls =>{this.games=pls});
      }
    

      supprimerGame(p: Game)
    {
    // console.log(p);
    let conf = confirm("Etes-vous sûr ?");
    if (conf){
    this.gameService.supprimerGame(p.idGame).subscribe(()=>{
    console.log("game supprimé");
    this.chargerGames();
    });
     } }
     chargerGames(){
      this.gameService.listeGame().subscribe(pls => {
        console.log(pls);
        this.games = pls;
        });
    }

}
