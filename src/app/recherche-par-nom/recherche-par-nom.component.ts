import { Component } from '@angular/core';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { Studio } from '../model/studio.model';


@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrl: './recherche-par-nom.component.css'
})
export class RechercheParNomComponent {
  allGames! : Game[];
  searchTerm!: string;
  nomGame!: string;
  games!: Game[];
  nom!:string;
  constructor(private gameService: GameService) { }


ngOnInit(): void {
  this.gameService.listeGame().subscribe(pls => {
  console.log(pls);
  this.allGames = pls;
  });
  }
  onKeyUp(filterText : string){
  this.games = this.allGames.filter(item =>item.nomGame.toLowerCase().includes(filterText));
  }

  rechercherPls(){
    this.gameService.rechercherParNom(this.nomGame).subscribe(pls => {
    this.games = pls;
    console.log(pls)});
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
