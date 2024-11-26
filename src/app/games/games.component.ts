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
    console.log('games');
    this.chargerGames();
  }
  chargerGames() {
    this.gameService.listeGame().subscribe({
      next: (games) => {
        this.games = games;
        console.log('games before processing:', this.games);

        this.games.forEach((game) => {
          // Add null checks and validation
          if (
            game.images &&
            Array.isArray(game.images) &&
            game.images.length > 0 &&
            game.images[0]?.type &&
            game.images[0]?.image
          ) {
            game.imageStr =
              'data:' + game.images[0].type + ';base64,' + game.images[0].image;
          } else {
            // Set a default image or handle the case when no image is available
            game.imageStr = ''; // Or handle as needed
            console.log('No valid image found for game:', game);
          }
        });
      },
      error: (error) => {
        console.error('Error loading games:', error);
      },
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
