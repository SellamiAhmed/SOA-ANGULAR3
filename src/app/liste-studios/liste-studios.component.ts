import { Component } from '@angular/core';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { Studio } from '../model/studio.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-studios',
  templateUrl: './liste-studios.component.html',
  styleUrl: './liste-studios.component.css',
})
export class ListeStudiosComponent implements OnInit {
  ajout: boolean = true;

  updatedStudio: Studio = {
    idStudio: 0,
    nomStudio: 'epic games',
    descriptionStudio: 'best studio',
  };
  studios!: Studio[];
  constructor(private gameService: GameService) {}
  ngOnInit(): void {
    this.gameService.listeStudios().subscribe((studios) => {
      if (Array.isArray(studios)) {
        this.studios = studios;
      } else {
        console.error(
          'Studios is undefined or does not contain "studios" property'
        );
      }
    });
  }

  studioUpdated(studio: Studio) {
    console.log('Studio updated event', studio);
    this.gameService
      .ajouterStudio(studio)
      .subscribe(() => this.chargerStudios());
  }
  chargerStudios() {
    this.gameService.listeStudios().subscribe((studios) => {
      if (Array.isArray(studios)) {
        this.studios = studios;
      } else {
        console.error(
          'Studios is undefined or does not contain "studios" property'
        );
      }
    });
  }
  updateStudio(studio: Studio) {
    this.updatedStudio = studio;
    this.ajout = false;
  }
}
