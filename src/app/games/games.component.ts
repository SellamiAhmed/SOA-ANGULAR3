import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
})
export class GamesComponent implements OnInit {
  games!: Game[];

  constructor(
    private gameService: GameService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('hhhhh');
    this.chargerGames();
  }
  chargerGames() {
    this.gameService.listeGame().subscribe((games) => {
      this.games = games;
      console.log("games",this.games);
      this.games.forEach((game) => {
        console.log("game",game);
        game.imageStr =
          'data:' + game?.images[0]?.type + ';base64,' + game?.images[0]?.image;
      });
    });
  }

  supprimerGame(p: Game) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.gameService.supprimerGame(p.idGame).subscribe(() => {
        console.log('game supprimé');
        this.chargerGames();
      });
    }
  }
}
